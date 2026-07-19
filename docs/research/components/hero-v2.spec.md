# HeroV2 Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshot:** `docs/design-references/local-current-desktop-1440-ready.png`
- **Interaction model:** scroll-driven + pointer/tap-driven

## DOM Structure
- Full-viewport cream stage with contour background.
- Fixed editorial metadata at left, kinetic oversized name behind portrait.
- Central portrait is split into five horizontal bands inside one circular stage.
- Each band contains both default and AI-mode portrait layers.
- Bottom-left research positioning copy and bottom-right circular scroll badge.

## Computed Styles
- Hero: background `rgb(244,244,237)`, color `rgb(40,44,32)`, `min-height: 100svh`, position relative, overflow hidden.
- Desktop avatar wrapper: square, max-width `880px`, minimum width `560px`; bottom offset `-24%`.
- Mobile avatar wrapper: `86vw`, max-width `400px`; bottom offset `-15%`.
- Display name: Anton, uppercase, `clamp(4.7rem,18vw,17rem)`, line-height `0.76`, letter-spacing `-0.04em`.

## States & Behaviors
- **Scroll:** whole portrait drifts down up to `150px`; headline up to `70px`; metadata fades after 35% hero progress.
- **Slice motion:** alternating portrait bands translate horizontally in opposite directions as hero scroll progresses; maximum offset 24px desktop / 12px mobile.
- **Hover/focus/tap:** crossfade all bands from default portrait to AI-mode; decorative rings rotate and lime glow strengthens.
- **Pointer:** whole stage retains subtle magnetic drift.
- Add an explicit small `TAP / HOVER TO SHIFT` hint beside the portrait on desktop and near the bottom on mobile.
- Reduced motion keeps slices aligned and disables continuous animation.

## Assets
- `/characters/chen-pixel-avatar.png`
- `/characters/chen-pixel-ai-mode.png`

## Responsive Behavior
- Desktop keeps wide identity type and left metadata.
- Mobile centers identity, keeps hint legible, clips the portrait within viewport, and uses smaller band travel.

