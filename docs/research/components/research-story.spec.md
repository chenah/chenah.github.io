# ResearchStory Specification

## Overview
- **Target file:** `src/components/ResearchStory.tsx`
- **Assembly:** between `About` and `CtaBand` in `src/app/page.tsx`
- **Interaction model:** scroll-driven sticky editorial narrative

## DOM Structure
- Cream section with compact index label and a two-column desktop grid.
- Left column: sticky statement, progress index and short explanatory copy.
- Right column: three vertically spaced research signal cards.
- Each card combines a paper figure, phase label, oversized keyword, summary and method tags.

## Visual Tokens
- Section background `#f4f4ed`, text `#282c20`.
- Sticky title: Anton uppercase, `clamp(4rem,8vw,8.5rem)`, line-height `0.82`.
- Accent: lime `#d2ff00`; editorial italic uses Georgia.
- Cards alternate `#282c20`/cream treatments and deliberate asymmetric offsets.
- Borders: one pixel `rgba(40,44,32,.42)`; hover transition `500ms cubic-bezier(.22,1,.36,1)`.

## States & Behaviors
- As a card enters the center band of the viewport, it becomes the active card.
- Active card scales to `1`, image opacity `1`, lime progress segment fills.
- Inactive cards scale to `0.96`, image opacity `0.62`.
- Hover lifts image by 8px and rotates the arrow by 45 degrees.
- The left progress label updates `01/03` through `03/03` using IntersectionObserver.

## Content
- Signal 01: Observe — human attention and interaction in collaborative VR; figure `/figures/avatar.jpg`.
- Signal 02: Prototype — agentic moderation and useful AI applications; figure `/figures/audio.jpg`.
- Signal 03: Validate — randomized and mixed-method evidence for AI in education; figure `/figures/network.png`.

## Responsive Behavior
- Desktop (>=1024px): sticky left column, staggered cards on right.
- Tablet/mobile: single column, sticky behavior removed, cards full width, title uses clamp sizing.
- Reduced motion: no scale/parallax transitions; all card content remains visible.

