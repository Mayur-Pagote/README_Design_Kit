# 🎨 Theme Packs

**Theme packs** are curated, coordinated bundles of README components — a matching
**banner**, **badges**, and **divider** that all share one visual language. Instead of
hand-picking individual elements (and ending up with a README where every section looks
like it came from a different project), you grab a pack and get a consistent look in one
copy.

Browse them in the app at **[`/theme-packs`](https://github.com/Mayur-Pagote/README_Design_Kit)**
(navigate via **More → Theme Packs**).

## 📦 What ships today

| Pack | Vibe | Palette |
| --- | --- | --- |
| **Neon** | High-contrast cyberpunk — animated, glowing accents | Magenta · Cyan · Violet |
| **Minimal** | Clean, monochrome, distraction-free | Slate · Gray · Light gray |
| **Retro** | Warm vintage arcade energy | Sunset orange · Amber · Cream |

Each pack includes:

- **Banner** — a header image (via [capsule-render](https://github.com/kyechan99/capsule-render)).
- **Badges** — a coordinated set of [Shields.io](https://shields.io) badges.
- **Divider** — a matching section separator.

## 🚀 Using a pack

1. Open the **Theme Packs** page.
2. (Optional) Enter your GitHub **username** and **repo** at the top — every snippet and
   preview updates live with your values.
3. Either:
   - **Copy full pack** — grabs the banner, badges, and divider as one ready-to-paste
     Markdown block, or
   - **Copy** a single component if you only want one piece.
4. Paste into your `README.md`.

The "Copy full pack" output looks like this (Neon example):

```markdown
<!-- Neon Theme Pack — via README Design Kit -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF00FF,100:00FFFF&height=200&section=header&text=your-repo&..." width="100%" />

![Built with Love](https://img.shields.io/badge/Built_with-Love-FF00FF?style=flat-square&labelColor=1a1a2e)
![Stars](https://img.shields.io/github/stars/your-username/your-repo?style=flat-square&color=00FFFF&labelColor=1a1a2e)
![License](https://img.shields.io/badge/License-MIT-8A2BE2?style=flat-square&labelColor=1a1a2e)

<img src="https://github.com/.../RGB%20Line%20Thick.gif?raw=true" width="100%" />
```

## 🧩 Mixing packs

Packs are a starting point, not a cage. A few rules of thumb to keep things coherent:

- **Match palettes, not packs.** You can pull a banner from one pack and badges from
  another as long as the colors agree. Each pack lists its accent colors (the hex chips
  next to its name) — reuse those hex values anywhere you add custom elements.
- **Keep one badge style.** Shields supports `flat`, `flat-square`, `plastic`, and
  `for-the-badge`. Stick to a single style across your README — Neon uses `flat-square`,
  Minimal uses `flat`, Retro uses `plastic`.
- **One divider, used consistently.** Reuse the same divider between every section rather
  than alternating styles.

## 🛠️ Extending: author your own pack

Packs live in [`src/data/themePacks.ts`](../src/data/themePacks.ts). Add a new object to
the `themePacks` array:

```ts
{
  id: "ocean",                 // unique, used for keys + #anchor
  name: "Ocean",
  description: "Cool blues and teal with a calm, flowing feel.",
  colors: ["0077B6", "00B4D8", "90E0EF"], // hex without '#'
  components: {
    banner:  { title: "Banner",  description: "...", imageUrl: "...", codeSnippet: "..." },
    badges:  { title: "Badges",  description: "...", imageUrl: "...", codeSnippet: "..." },
    divider: { title: "Divider", description: "...", imageUrl: "...", codeSnippet: "..." },
  },
}
```

Notes:

- `imageUrl` is the live preview shown in the gallery; `codeSnippet` is what gets copied.
  They can differ (e.g. a static preview for an animated snippet).
- Use the `{username}` and `{repo}` placeholders anywhere — they're substituted with the
  visitor's input at copy time (and fall back to `your-username` / `your-repo`).
- Keep all three components in the **same palette** so the pack reads as a set.
- That's it — the gallery page, quick-jump links, and "Copy full pack" button pick up new
  packs automatically. No page changes required.

---

*Part of the [README Design Kit](../README.md) documentation. See the
[Documentation Index](./INDEX.md) for more guides.*
