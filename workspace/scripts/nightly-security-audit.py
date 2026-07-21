#!/usr/bin/env python3
"""OpenClaw 安全巡检脚本 v2.7 (Windows 适配版)
路径：$OC/workspace/scripts/nightly-security-audit.py
运行时间：每日 03:00 (Hermes cron job)
"""

import hashlib
import json
import os
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

OC = Path(os.environ.get("OPENCLAW_STATE_DIR", Path.home() / ".openclaw"))
REPORT_LINES = []


def log(msg):
    REPORT_LINES.append(msg)
    print(msg)


def run_cmd(cmd, timeout=15):
    """Run a shell command and return (stdout, stderr, returncode)."""
    try:
        r = subprocess.run(
            cmd, capture_output=True, timeout=timeout, shell=True
        )
        out = r.stdout.decode("utf-8", errors="replace").strip() if r.stdout else ""
        err = r.stderr.decode("utf-8", errors="replace").strip() if r.stderr else ""
        return out, err, r.returncode
    except subprocess.TimeoutExpired:
        return "", "(timeout)", -1
    except FileNotFoundError:
        return "", "(command not found)", -1


def format_size(size_bytes):
    """Format bytes to human-readable."""
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024:
            return f"{size_bytes:.1f}{unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f}TB"


def find_recent_changes(directory, hours=24, max_depth=3, max_files=20):
    """Find recently modified files in a directory."""
    changes = []
    cutoff = datetime.now() - timedelta(hours=hours)
    try:
        for f in Path(directory).rglob("*"):
            if f.is_file():
                try:
                    mtime = datetime.fromtimestamp(f.stat().st_mtime)
                    if mtime > cutoff:
                        changes.append(f)
                except (OSError, ValueError):
                    continue
    except PermissionError:
        return []
    return changes[:max_files]


def parse_openclaw_json(path):
    """Parse openclaw.json, handling non-standard JSON (bare keys, trailing commas)."""
    raw = path.read_text("utf-8", errors="replace")
    # Fix bare keys (unquoted property names)
    raw = re.sub(r'(?<!")(\b[a-zA-Z_][a-zA-Z0-9_]*\b)(?=\s*:)', r'"\1"', raw)
    # Fix trailing commas
    raw = re.sub(r',(\s*[}\]])', r'\1', raw)
    # Remove BOM
    raw = raw.lstrip("\ufeff")
    return json.loads(raw)


# ═══════════════════════════════════════════════
# 巡检开始
# ═══════════════════════════════════════════════
print(f"=== OpenClaw 安全巡检报告: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ===")
print()

# ─── 1. OpenClaw 配置审计 ───
log("🔍 [1/13] OpenClaw 配置审计:")
oc_json = OC / "openclaw.json"
if oc_json.exists():
    try:
        cfg = parse_openclaw_json(oc_json)
        keys = list(cfg.keys())
        log(f"  openclaw.json 配置项: {len(keys)} 个")

        # 检查是否有敏感字段暴露
        sensitive = [k for k in keys if any(s in k.lower() for s in ["key", "token", "secret", "password"])]
        if sensitive:
            log(f"  ⚠️ 注意: 存在敏感字段: {sensitive}")
        else:
            log(f"  ✅ 未发现敏感字段")

        # 检查是否加密
        enc_mode = cfg.get("config", {}).get("encryption", {}).get("mode", "未启用")
        log(f"  ℹ️ 配置加密: {enc_mode}")
    except Exception as e:
        log(f"  ❌ 配置解析失败: {e}")
else:
    log(f"  ❌ openclaw.json 不存在")

# ─── 2. 进程与网络审计 ───
log("🔍 [2/13] 进程与网络审计:")
stdout, _, _ = run_cmd("netstat -ano 2>nul | findstr LISTENING")
if stdout:
    ports = [line.strip() for line in stdout.split("\n") if line.strip()]
    log(f"  监听端口: {len(ports)} 个")
    # 显示已知端口
    known_ports = set()
    for p in ports[:20]:
        parts = p.split()
        if len(parts) >= 2:
            addr = parts[1]
            log(f"    {addr}")
            known_ports.add(addr)
else:
    log(f"  (无法获取监听端口)")

# 进程列表
stdout, _, _ = run_cmd("tasklist /nh /fo csv 2>nul")
if stdout:
    lines = [l.strip() for l in stdout.split("\n") if l.strip()]
    log(f"  进程数: {len(lines)}")
    for line in lines[:5]:
        parts = line.split(",")
        if len(parts) > 1:
            name = parts[0].strip('"')
            pid = parts[1].strip('"')
            log(f"    {name} (PID: {pid})")
else:
    log(f"  (无法获取进程列表)")

# ─── 3. 敏感目录变更 ───
log("🔍 [3/13] 敏感目录 24h 变更:")
for dir_name, dir_path in [
    ("$OC", OC),
    ("~/.ssh", Path.home() / ".ssh"),
    ("~/.gnupg", Path.home() / ".gnupg"),
]:
    if dir_path.exists():
        changes = find_recent_changes(dir_path, hours=24, max_depth=3)
        log(f"  {dir_name}: {len(changes)} 文件变更")
        for f in changes[:5]:
            try:
                rel = f.relative_to(dir_path) if f != dir_path else f
            except ValueError:
                rel = f
            log(f"    + {rel}")
    else:
        log(f"  {dir_name}: (不存在)")

# ─── 4. 系统定时任务 ───
log("🔍 [4/13] 系统定时任务:")
stdout, _, _ = run_cmd("schtasks /query /fo LIST /v 2>nul | findstr /i \"TaskName|Next Run\"")
if stdout:
    lines = [l.strip() for l in stdout.split("\n") if l.strip()]
    log(f"  计划任务: 扫描到 {len(lines)//2} 个任务")
    for l in lines[:10]:
        log(f"    {l}")
else:
    log(f"  (无法获取计划任务信息)")

# ─── 5. Hermes Cron Jobs ───
log("🔍 [5/13] Hermes Cron Jobs:")
log(f"  ℹ️ 请通过 Hermes 界面查看: cronjob action='list'")

# ─── 6. 登录与安全事件 ───
log("🔍 [6/13] 安全事件:")
stdout, stderr, rc = run_cmd("wevtutil qe Security /q:\"*[System[EventID=4625]]\" /c:5 /f:text 2>nul")
if rc == 0 and stdout:
    log(f"  最近登录失败事件:")
    for line in stdout.split("\n")[:10]:
        if line.strip():
            log(f"    {line.strip()}")
else:
    log(f"  (无法读取安全日志，可能需要管理员权限)")

# ─── 7. 哈希基线对比 ───
log("🔍 [7/13] 关键文件完整性:")
baseline = OC / ".config-baseline.sha256"
if baseline.exists():
    try:
        with open(baseline) as f:
            expected_hash, expected_file = f.read().strip().split(maxsplit=1)
        if oc_json.exists():
            current_hash = hashlib.sha256(oc_json.read_bytes()).hexdigest()
            if current_hash == expected_hash:
                log(f"  ✅ openclaw.json 哈希一致 (SHA256)")
            else:
                log(f"  ❌ openclaw.json 哈希不一致！")
                log(f"    期望: {expected_hash}")
                log(f"    当前: {current_hash}")
    except Exception as e:
        log(f"  ⚠️ 基线校验失败: {e}")
else:
    log(f"  ⚠️ 哈希基线未生成")

log(f"  权限检查:")
for f in [oc_json, OC / "devices" / "paired.json"]:
    if f.exists():
        try:
            mode = oct(f.stat().st_mode)[-3:]
            log(f"    {f.name}: {mode}")
        except:
            pass
    else:
        log(f"    {f.name}: (不存在)")

# ─── 8. 黄线操作验证 ───
log("🔍 [8/13] 黄线操作验证:")
log(f"  ℹ️ 需人工比对 memory 日志中的操作记录与系统事件")

# ─── 9. 磁盘使用 ───
log("🔍 [9/13] 磁盘使用:")
stdout, _, _ = run_cmd("wmic logicaldisk get size,freespace,caption 2>nul", timeout=5)
if stdout:
    for line in stdout.strip().split("\n")[1:]:
        parts = line.strip().split()
        if len(parts) >= 3:
            drive, free, total = parts[0], int(parts[1]), int(parts[2])
            if total > 0:
                usage = (1 - free / total) * 100
                icon = "❌" if usage > 85 else "✅"
                log(f"  {icon} {drive} 使用率: {usage:.1f}% ({format_size(free)} 可用 / {format_size(total)})")
else:
    log(f"  (无法获取磁盘信息)")

log(f"  最近 24h 大文件 (>100MB): 跳过（Windows 全盘扫描较慢，建议手动检查）")

# ─── 10. Gateway 环境变量 ───
log("🔍 [10/13] Gateway 环境变量:")
stdout, _, _ = run_cmd("wmic process where \"name like '%openclaw%' or name like '%gateway%'\" get processid,commandline /format:csv 2>nul")
if stdout:
    log(f"  OpenClaw 进程:")
    for line in stdout.split("\n")[1:3]:
        if line.strip():
            log(f"    {line.strip()}")
else:
    log(f"  (未检测到 openclaw 进程)")

# ─── 11. DLP 凭证扫描 ───
log("🔍 [11/13] DLP 凭证扫描:")
workspace = OC / "workspace"
if workspace.exists():
    patterns = [
        "PRIVATE KEY", "BEGIN RSA", "BEGIN EC", "BEGIN OPENSSH",
        "wallet", "mnemonic", "0x[a-fA-F0-9]{40,}"
    ]
    total_found = 0
    for f in workspace.rglob("*"):
        if f.is_file() and f.suffix in [".txt", ".md", ".json", ".yaml", ".yml", ".env", ".cfg", ".conf", ".ini"]:
            try:
                content = f.read_text(errors="ignore")
                for pat in patterns:
                    if pat.lower() in content.lower():
                        log(f"  ⚠️ 疑似凭证: {f.relative_to(workspace)} (匹配: {pat})")
                        total_found += 1
                        break
            except (OSError, PermissionError):
                continue
    if total_found == 0:
        log(f"  ✅ 未发现疑似凭证")
else:
    log(f"  ℹ️ workspace 目录为空或不存在")

# ─── 12. Skill/MCP 完整性 ───
log("🔍 [12/13] Skill/MCP 完整性:")
skills_dir = OC / "workspace" / "skills"
if skills_dir.exists():
    skills = list(skills_dir.rglob("SKILL.md"))
    log(f"  Skill 数量: {len(skills)}")
    for s in skills:
        log(f"    📦 {s.parent.name}")
else:
    log(f"  ℹ️ 尚无本地 Skill 仓库")

# ─── 13. 灾备状态 ───
log("🔍 [13/13] 灾备状态:")
git_dir = OC / ".git"
if git_dir.exists():
    stdout, _, _ = run_cmd(f'cd /d {OC} && git log --oneline -1 2>nul')
    log(f"  ✅ Git 仓库已初始化")
    log(f"  最近 commit: {stdout.split(chr(10))[0] if stdout else '无'}")
    stdout, _, _ = run_cmd(f'cd /d {OC} && git remote -v 2>nul')
    if stdout:
        for line in stdout.split("\n"):
            log(f"  Remote: {line.strip()}")
    else:
        log(f"  ⚠️ 未配置远程仓库")
else:
    log(f"  ⚠️ Git 仓库未初始化")

# ═══════════════════════════════════════════════
print()
print("=== 巡检完成 ===")
print(f"巡检时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"巡检项: 13/13")