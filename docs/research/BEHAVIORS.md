# Interaction and responsive behavior

## Reference observations

- The page uses Lenis (`html.lenis`) and hides the native scrollbar.
- Header controls remain fixed while the background changes under them.
- The hero is a canvas/layered composition: horizontal slices move independently while scrolling.
- The manifesto enters on a dark olive field; key words switch to lime and an editorial serif.
- The biography is an asymmetric collage with deliberately oversized gaps.
- Hover targets use quick color inversion and small translations.
- Desktop layout is extremely wide and spatial; the 390px layout re-centers the identity, stacks controls, and lets the portrait fill the lower viewport.

## Adapted implementation

- Lenis remains the page-level scroll model.
- Hero copy uses masked entrance animation; the central 16-bit platform-game avatar rises into the scene.
- Desktop pointer hover crossfades the normal avatar into an AI-applications mode with a neural-network halo, circuit jacket, and data cubes.
- Touch devices expose the same transformation with a tap toggle.
- Major sections reveal with viewport-triggered motion.
- Navigation opens a full-screen panel on mobile and compact desktop navigation remains visible.
- Publication rows slide right and invert their index chip on hover.
- Project cards move their decorative “data orbit” on hover.
- At `max-width: 767px`, asymmetric grids collapse, display type scales with `clamp()`, and the hero visual is kept within the viewport.
- `prefers-reduced-motion` disables continuous motion and smooth scrolling.
