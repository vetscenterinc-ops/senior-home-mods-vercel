import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function generateAppIcon() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 512, height: 512 },
    deviceScaleFactor: 1
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 512px;
      height: 512px;
      background: #faf7f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 440px;
      height: 440px;
    }
    svg {
      width: 320px;
      height: 220px;
      overflow: visible;
    }
    .title {
      margin-top: 24px;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0b2a4a;
      text-transform: uppercase;
    }
    .subtitle {
      margin-top: 4px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #b8860b;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Navy Arched House & Roofline -->
      <path
        d="M 28 82 L 28 58 L 80 20 L 132 58 L 132 82"
        stroke="#0b2a4a"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M 80 12 C 46 12 18 40 18 80"
        stroke="#0b2a4a"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M 80 12 C 114 12 142 40 142 80"
        stroke="#0b2a4a"
        stroke-width="6"
        stroke-linecap="round"
      />

      <!-- Warm Golden Window -->
      <rect
        x="72"
        y="38"
        width="16"
        height="16"
        rx="2"
        fill="#e6c77f"
        stroke="#0b2a4a"
        stroke-width="3"
      />
      <line x1="80" y1="38" x2="80" y2="54" stroke="#0b2a4a" stroke-width="2.5" />
      <line x1="72" y1="46" x2="88" y2="46" stroke="#0b2a4a" stroke-width="2.5" />

      <!-- Senior Couple Icon -->
      <circle cx="62" cy="54" r="5" fill="#0b2a4a" />
      <path
        d="M 54 78 C 54 67 60 63 67 63 C 71 63 74 65 76 68"
        stroke="#0b2a4a"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle cx="77" cy="57" r="4.5" fill="#0b2a4a" />
      <path
        d="M 70 78 C 70 69 74 66 82 66 C 88 66 92 70 92 78"
        stroke="#0b2a4a"
        stroke-width="4"
        stroke-linecap="round"
      />
      <!-- Walking Cane -->
      <path d="M 53 68 L 51 82" stroke="#0b2a4a" stroke-width="3" stroke-linecap="round" />

      <!-- Accessible Gentle Ramp with Handrails -->
      <path
        d="M 86 82 L 138 72"
        stroke="#0b2a4a"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <path
        d="M 94 72 L 138 62"
        stroke="#0b2a4a"
        stroke-width="3.5"
        stroke-linecap="round"
      />
    </svg>
    <div class="title">Senior Home Mods</div>
    <div class="subtitle">USDA Rural Grants</div>
  </div>
</body>
</html>
  `;

  await page.setContent(html);
  const outPath = path.resolve('public/images/app-icon.png');
  await page.screenshot({ path: outPath, type: 'png' });
  console.log(`Generated master app icon at ${outPath}`);

  await browser.close();
}

generateAppIcon().catch(console.error);
