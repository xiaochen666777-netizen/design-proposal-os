from playwright.sync_api import sync_playwright
import os

out_dir = r"C:\Users\liguoqing\Documents\Codex\2026-06-30\proposal-generation-system-v1-ppt-pdf\outputs"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
     browser = p.chromium.launch()
     page = browser.new_page(viewport={"width": 1440, "height": 900})
     
     page.goto("http://localhost:8080", wait_until="networkidle")
     page.wait_for_timeout(1000)
     page.screenshot(path=os.path.join(out_dir, "01-generate-page.png"), full_page=True)
     print("Screenshot 1: Generate page")
     
     page.fill("#projectDesc", "3 bedroom luxury apartment, calm, modern, natural materials")
     page.select_option("#budgetLevel", "mid")
     page.select_option("#stylePref", "luxury")
     page.click("#generateBtn")
     page.wait_for_timeout(4000)
     page.screenshot(path=os.path.join(out_dir, "02-proposal-overview.png"), full_page=True)
     print("Screenshot 2: Proposal Overview")
     
     sections = ["style", "design-system", "space", "budget", "references", "decision"]
     names = ["Style Direction", "Design System", "Space Strategy", "Budget Layer", "References", "Decision Panel"]
     for i, (sec, name) in enumerate(zip(sections, names)):
         sid = "section-" + sec
         page.evaluate("document.getElementById('" + sid + "').scrollIntoView()")
         page.wait_for_timeout(500)
         page.screenshot(path=os.path.join(out_dir, f"0{i+3}-{sec}.png"), full_page=True)
         print(f"Screenshot {i+3}: {name}")
     
     browser.close()
     print("All screenshots taken!")
