import os

BASE = r"C:\Users\liguoqing\Documents\Codex\2026-06-30\proposal-generation-system-v1-ppt-pdf\app"

def w(rel, content):
    p = os.path.join(BASE, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"wrote {rel} ({len(content)} bytes)")

# We will read file contents from separate .txt files
import glob, sys

content_dir = r"C:\Users\liguoqing\Documents\Codex\2026-06-30\proposal-generation-system-v1-ppt-pdf\_src"
os.makedirs(content_dir, exist_ok=True)

print("Builder ready. Waiting for source files...")
