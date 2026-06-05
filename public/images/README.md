# Image assets

Final image files live in this folder. The app references them through the central
config in `src/lib/images.ts`. Until a real file exists, the UI shows a styled photo
style placeholder, so missing files never break the layout.

## How to add a real image

1. Export the art as **WebP** to the exact filename below.
2. In `src/lib/images.ts`, set `available: true` for that asset.
3. Done. `AssetImage` swaps the placeholder for the photo and still falls back to the
   placeholder if the file ever fails to load.

## Expected files

| File | Used for | Suggested ratio |
| --- | --- | --- |
| `hero-cabinet-chaos.webp` | Homepage hero, before (Chaos) | 3:4 portrait |
| `hero-cabinet-fixed.webp` | Homepage hero, after (Fixed) | 3:4 portrait |
| `mess-bottle-avalanche.webp` | Bottle Avalanche mess card | 4:3 landscape |
| `mess-pipe-maze.webp` | Pipe Maze mess card | 4:3 landscape |
| `mess-tiny-cabinet.webp` | Tiny Cabinet Energy mess card | 4:3 landscape |
| `component-access.webp` | Three piece fix, Access (pull out organizer) | 4:3 landscape |
| `component-protection.webp` | Three piece fix, Protection (waterproof liner) | 4:3 landscape |
| `component-control.webp` | Three piece fix, Control (cleaning caddy) | 4:3 landscape |

Keep the aspect ratio matching the table so there is no layout shift when the real
image replaces the placeholder. Compress for web (aim under ~200 KB each).
