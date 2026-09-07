# public/assets

Static assets served under `/assets/*`. Reference from code with an absolute path — e.g. `<img src="/assets/brand/logo.svg" />`.

## Folders

| Folder            | Put here                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| `brand/`          | IRSL Consulting logo files, favicon sources, brand marks                 |
| `leadership/`     | Principal portraits (4:5, ≥ 800×1000, WebP or JPEG)                      |
| `partners/`       | Technology-partner logos — SAP, SailPoint, Okta, etc. (SVG preferred)    |
| `case-studies/`   | Cover images and inline images for case studies                          |
| `sectors/`        | Sector illustrations if we move off inline SVG icons                     |

## Formats

- **SVG** for logos and icons — smallest, sharpest at every zoom.
- **WebP** for photos, with a JPEG fallback if a client hits a very old browser.
- **AVIF** is fine too — Next 15's image loader handles it.

## Optimisation

Images referenced through `next/image` are optimised automatically on demand. Anything served directly (favicon, OG fallbacks, RSS thumbnails) should be pre-sized.

## Naming

- Kebab-case, no spaces: `sap-partner-badge.svg`, `ada-adepoju-portrait.webp`.
- Prefix leadership portraits with the person's slug so they sort with their content: `ada-adepoju.webp`.
