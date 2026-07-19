# LoaderV2 Specification

## Overview
- **Target file:** `src/components/Loader.tsx`
- **Screenshot:** `docs/design-references/local-current-desktop-1440.png`
- **Interaction model:** time-driven, one-shot intro

## DOM Structure
- Fixed full-screen curtain.
- Centered portfolio label, display name, progress rule and two-digit counter.
- `AnimatePresence` lifts the curtain after completion.

## Computed Styles
- Container: fixed inset `0`, z-index `200`, display `flex`, centered, background `#282c20`, color `#f4f4ed`.
- Progress: maximum width `420px`, lime `#d2ff00` fill, one-pixel cream rule.
- Display name: Anton, uppercase, `clamp(3.4rem, 11vw, 9rem)`, line-height `0.86`.

## States & Behaviors
- **Initial:** counter `00`, progress `0`, scroll locked.
- **Counting:** progress reaches `100` in roughly 1.15 seconds.
- **Exit:** curtain translates to `-100%` over `0.9s`, easing `[0.76,0,0.24,1]`.
- Counting must not depend exclusively on `requestAnimationFrame`; background tabs must complete.
- Include a hard completion deadline and clear all timers on unmount.
- Respect `prefers-reduced-motion`: skip immediately.

## Responsive Behavior
- Same centered composition at 1440px and 390px; text uses clamp sizing.

