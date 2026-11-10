# Fast Traders — React / TypeScript website

Complete TSX implementation in `app/FastTraders.tsx`. This file contains all components, page content, contact details, image mapping and responsive styles. Route entry files under `app/` render each separate page.

## Run
Requires Node.js 22.13+.

```bash
npm install
npm run dev
```

The development server uses the included Vinext/Vite runtime. Production builds use standard Next.js so the project can deploy directly to Vercel. No backend is needed for inquiries: the contact form prepares a message and the visitor explicitly sends it through WhatsApp.

## Deploy on Vercel
Import the GitHub repository and use the **Next.js** framework preset. Keep the root directory as `./`, the build command as `npm run build` (or Vercel's detected default), and the output directory at its default. The build generates the project-photo manifest and then runs `next build`; do not override the output directory with `dist`.

## Customise
- Company contact details: `COMPANY` near the top of `app/FastTraders.tsx`.
- Service photographs are mapped in `PHOTOS` in the TSX. The home hero, before/after slider, and each project gallery use separate local image paths.
- Add the home-page image as `public/images/home-page.jpg`.
- Add before/after photos as `public/images/before-after/before.jpg` and `public/images/before-after/after.jpg`. Use photos of the same project.
- Each project has four independent photo slots under `public/images/projects/<project-slug>/`, named `photo-1.jpg` through `photo-4.jpg`. Use the project slug shown in the gallery section below.
- Original supplied logo is `public/images/logo.jpg`.
- All 15 services have separate URLs under `/services/`.
- Quote requests use the phone, email and Lahore address visible on the supplied quotation; confirm these with the client before public launch.

## Photography
Real stock photographs from Unsplash, downloaded locally (not AI generated):
- Living: photo-1600210492486-724fe5c67fb0
- Office: photo-1497366754035-f200968a6e72
- Kitchen: photo-1556912172-45b7abe8b7e1
- Bathroom: photo-1620626011761-996317b8d101
- Woodwork inspiration: photo-1516455590571-18256e5bb9ff
- Planning inspiration: photo-1503387762-592deb58ef4e
Downloaded from images.unsplash.com. Reference layout inspiration: https://renovator.pk/; implementation, branding and copy are original to this project.

## Project galleries
Each project has a separate route under `/projects/`. Add any number of local image files to its folder; the site detects the files and adjusts the gallery automatically. Supported formats are `.jpg`, `.jpeg`, `.png`, and `.webp`. Images are shown in natural filename order (`photo-1`, `photo-2`, and so on). The gallery updates automatically while the development server is running. Left/right arrows wrap; detail galleries also have thumbnails. Portrait photos are fitted into the gallery rather than cropped.

| Project slug | Image folder |
|---|---|
| `govt-punjab-control-room` | `public/images/projects/govt-punjab-control-room/` |
| `bank-islami-atm-redo` | `public/images/projects/bank-islami-atm-redo/` |
| `ubl-ameen-branch-renovation` | `public/images/projects/ubl-ameen-branch-renovation/` |
| `dubai-islamic-bank-renovation` | `public/images/projects/dubai-islamic-bank-renovation/` |
| `dha-home-kitchen` | `public/images/projects/dha-home-kitchen/` |

For example, `public/images/projects/dha-home-kitchen/photo-1.jpg` is the first photo for the DHA kitchen project. Add as many photos as you have; there are no fixed four-photo slots. Project photos are not shared with service images, the home hero, or the before/after slider. To add a new project page, add its information to `projectDetails` in `app/FastTraders.tsx`, then create a folder using the same slug under `public/images/projects/` and add its images.
