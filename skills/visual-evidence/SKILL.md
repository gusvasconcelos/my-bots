---
name: visual-evidence
description: How to capture screenshots and screen recordings of tests and bugs, name them, scrub sensitive data, and attach them. Use when verifying changes or reporting bugs.
---

# Visual evidence

## Tools, in order of preference

1. **Playwright** (if the project has it, or in a temporary folder with `npx playwright`):
   - Screenshot: `await page.screenshot({ path: "evidence/<name>.png", fullPage: true })`.
   - Recording: create the context with `recordVideo: { dir: "evidence/", size: { width: 1280, height: 720 } }`; the video is saved when the context closes.
   - Trace (step by step, with network and console): `await context.tracing.start({ screenshots: true, snapshots: true })` and `tracing.stop({ path: "evidence/<name>.zip" })`.
   - Mobile: use `devices["iPhone 13"]` or `devices["Pixel 7"]`.
2. **The bot's computer** (OpenMausBot cloud desktop or local VM): use the computer's own screenshot tool for flows that cannot be automated.
3. **ffmpeg** to convert: `ffmpeg -i video.webm -vf "fps=12,scale=960:-1" bug.gif` (a short GIF for the ticket) or `ffmpeg -i video.webm bug.mp4`.

## Naming

`YYYY-MM-DD_<product>_<flow>_<result>.<ext>`, for example `2026-10-13_app_checkout-100-coupon_fail.mp4`.

## What to capture

- A screenshot of the expected state and of the actual state.
- A short recording (up to 60 s) of any failure, starting one step before the problem.
- The browser console and the network response of the failing call.
- The URL and time (with time zone) in the screenshot itself or in the caption.

## Before attaching

- Blur or crop emails, names, documents, tokens, keys, and card data.
- Prefer test accounts and test data so nothing needs blurring.
- Store the files in `knowledge/qa/evidence/` and attach them to the ticket or PR.
