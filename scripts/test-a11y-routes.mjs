import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/how-it-works",
  "/sign-in",
  "/check",
  "/check/eligible",
  "/check/not-eligible",
  "/account",
  "/questions",
  "/about-you",
  "/home",
  "/documents",
  "/schedule",
  "/status",
  "/request",
  "/profile",
  "/style-guide",
];

async function runA11yAudit() {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  console.log("Starting WCAG 2.2 AA automated audit across all routes...\n");

  const results = [];

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 10000 });
    await page.waitForTimeout(300);

    // 1. Axe scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    // 2. 320px viewport width horizontal overflow check
    await page.setViewportSize({ width: 320, height: 700 });
    const hasHorizontalOverflow320 = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // 3. Small touch targets check (< 48px)
    const smallTargets = await page.evaluate(() => {
      const interactives = Array.from(
        document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="checkbox"], [role="radio"]')
      );
      const violations = [];
      for (const el of interactives) {
        const rect = el.getBoundingClientRect();
        // Ignore hidden elements or zero size
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          violations.push({
            tag: el.tagName,
            text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          });
        }
      }
      return violations;
    });

    results.push({
      route,
      violations: accessibilityScanResults.violations,
      hasHorizontalOverflow320,
      smallTargets,
    });

    console.log(
      `Route ${route}: ${accessibilityScanResults.violations.length} axe violations, 320px overflow: ${hasHorizontalOverflow320}, small targets: ${smallTargets.length}`
    );
  }

  await browser.close();

  console.log("\n--- Full Audit Summary ---");
  for (const r of results) {
    if (r.violations.length > 0) {
      console.log(`\nViolations for ${r.route}:`);
      for (const v of r.violations) {
        console.log(` - [${v.impact}] ${v.id}: ${v.description}`);
        for (const n of v.nodes) {
          console.log(`     Target: ${n.target.join(", ")}`);
        }
      }
    }
  }

  return results;
}

runA11yAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
