# Specification

## Summary
**Goal:** Rebrand the app for a looksmaxxing theme, fix selfie “Current Rating” scoring/display, make selfie submission work without camera access, and refocus workouts on teen-safe (13+) home plans.

**Planned changes:**
- Fix backend selfie scoring so `CrossRealityScore.rating` is computed meaningfully (not always 0) while keeping the same deterministic/explainable approach and unchanged API shape (`rating`, `potentialRating`, `details`).
- Update frontend score UI to safely format and display Current Rating and Potential Rating (including older/edge-case saved sessions), and ensure Current Rating updates after a new submission.
- Improve selfie capture UX with an upload-first fallback when camera is unsupported, fails to start, or permissions are denied, while preserving camera capture when it works.
- Rebrand user-facing app name and landing/header copy from “Rate & Elevate” to a looksmaxxing-themed name/description, including updating app icon alt text.
- Update Workouts page copy and plan generator content to emphasize teen-safe (13+), home-friendly bodyweight/minimal equipment workouts with appropriate safety notes.

**User-visible outcome:** Users see the new looksmaxxing branding, can submit selfies even without camera access, get a correctly updating Current Rating alongside Potential Rating, and receive teen-appropriate (13+) home workout plans and safety guidance.
