# Varun — GitHub Pages

Portfolio at https://varunpkashyap.github.io, built from the latest portfolio source.
The site includes the design, animation, interactive tools, project downloads,
weekly digest and all four archived editions.

## Publishing

GitHub Pages publishes the `main` branch's root using the repository's existing
branch deployment. The root `index.html`, `_next/`, assets and `.nojekyll` are the
prepared static export. No application server or API key is needed.

## Make changes

Editable source is in `app/`, with content and assets in `public/`.
With Node 22 and pnpm 11.19.0:

```sh
pnpm install --frozen-lockfile
pnpm validate:digest
pnpm build
```

The build exports `out/`, verifies assets and digest preservation, then refreshes
the publishable files at the repository root. `.pages-export.json` tracks generated
files so later builds remove obsolete export files while preserving source.
Commit the source and regenerated export together, then push `main`.
Confirm the GitHub Pages deployment succeeds before reporting a live update.

## Weekly digest

Edition 004 was published 23 September 2026. Read `EDITORIAL.md` before curating.
Preserve archive entries in `public/digest-archive.json`, update `public/digest.json`
and verified thumbnail metadata/assets, validate, rebuild and publish.
The existing Monday curation task selects articles; Pages only publishes files.

Local game records are browser-origin specific and start fresh at the new URL.
