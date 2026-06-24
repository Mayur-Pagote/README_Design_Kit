// Theme Packs — curated, coordinated bundles of README components (banner, badges,
// and divider) that share a single visual language. Pick a pack and copy a whole set
// of matching elements instead of stitching together mismatched components.
//
// See `docs/theme-packs.md` for guidance on mixing and extending packs.

export interface ThemePackComponent {
  /** Short label for the component (e.g. "Banner", "Badges", "Divider"). */
  title: string;
  /** One-line description of what the component is. */
  description: string;
  /** Preview image rendered in the gallery. Supports {username} / {repo} placeholders. */
  imageUrl: string;
  /** Ready-to-copy Markdown / HTML snippet. Supports {username} / {repo} placeholders. */
  codeSnippet: string;
}

export interface ThemePack {
  /** Unique id used for keys and anchors. */
  id: string;
  /** Display name of the pack (e.g. "Neon"). */
  name: string;
  /** One-line summary of the pack's aesthetic. */
  description: string;
  /** Representative accent colors (hex, no `#`) used for the gallery accent + chips. */
  colors: string[];
  /** The matching components that make up the pack. */
  components: {
    banner: ThemePackComponent;
    badges: ThemePackComponent;
    divider: ThemePackComponent;
  };
}

export const themePacks: ThemePack[] = [
  {
    id: "neon",
    name: "Neon",
    description:
      "High-contrast cyberpunk vibes — electric magenta and cyan on a dark canvas with animated, glowing accents.",
    colors: ["FF00FF", "00FFFF", "8A2BE2"],
    components: {
      banner: {
        title: "Banner",
        description: "Waving gradient header with a neon magenta-to-cyan glow.",
        imageUrl:
          "https://capsule-render.vercel.app/api?type=waving&color=0:FF00FF,100:00FFFF&height=200&section=header&text={repo}&fontColor=ffffff&fontSize=55&fontAlignY=38&desc=Crafted%20with%20Neon&descAlignY=58&animation=fadeIn",
        codeSnippet:
          '<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF00FF,100:00FFFF&height=200&section=header&text={repo}&fontColor=ffffff&fontSize=55&fontAlignY=38&desc=Crafted%20with%20Neon&descAlignY=58&animation=fadeIn" width="100%" />',
      },
      badges: {
        title: "Badges",
        description: "Flat-square badges in neon magenta and cyan.",
        imageUrl:
          "https://img.shields.io/badge/Built_with-Love-FF00FF?style=flat-square&labelColor=1a1a2e",
        codeSnippet: [
          "![Built with Love](https://img.shields.io/badge/Built_with-Love-FF00FF?style=flat-square&labelColor=1a1a2e)",
          "![Stars](https://img.shields.io/github/stars/{username}/{repo}?style=flat-square&color=00FFFF&labelColor=1a1a2e)",
          "![License](https://img.shields.io/badge/License-MIT-8A2BE2?style=flat-square&labelColor=1a1a2e)",
        ].join("\n"),
      },
      divider: {
        title: "Divider",
        description: "Animated RGB line that matches the neon glow.",
        imageUrl:
          "https://github.com/Mayur-Pagote/README_Design_Kit/blob/730d340c8008758ac291ebc555f818f851feda0f/Assets/RGB%20Line%20Thick.gif?raw=true",
        codeSnippet:
          '<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/730d340c8008758ac291ebc555f818f851feda0f/Assets/RGB%20Line%20Thick.gif?raw=true" width="100%" />',
      },
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Clean, monochrome, and distraction-free — soft grays, flat badges, and a subtle hairline divider for a professional look.",
    colors: ["1f2937", "6b7280", "d1d5db"],
    components: {
      banner: {
        title: "Banner",
        description: "Simple flat header in muted slate with centered title.",
        imageUrl:
          "https://capsule-render.vercel.app/api?type=rect&color=1f2937&height=160&section=header&text={repo}&fontColor=ffffff&fontSize=48&fontAlignY=50&desc=Minimal%20%C2%B7%20Clean%20%C2%B7%20Focused&descAlignY=72&descSize=16",
        codeSnippet:
          '<img src="https://capsule-render.vercel.app/api?type=rect&color=1f2937&height=160&section=header&text={repo}&fontColor=ffffff&fontSize=48&fontAlignY=50&desc=Minimal%20%C2%B7%20Clean%20%C2%B7%20Focused&descAlignY=72&descSize=16" width="100%" />',
      },
      badges: {
        title: "Badges",
        description: "Flat grayscale badges with no logos for a restrained look.",
        imageUrl:
          "https://img.shields.io/badge/status-active-6b7280?style=flat&labelColor=1f2937",
        codeSnippet: [
          "![Status](https://img.shields.io/badge/status-active-6b7280?style=flat&labelColor=1f2937)",
          "![Stars](https://img.shields.io/github/stars/{username}/{repo}?style=flat&color=6b7280&labelColor=1f2937)",
          "![License](https://img.shields.io/badge/license-MIT-d1d5db?style=flat&labelColor=1f2937)",
        ].join("\n"),
      },
      divider: {
        title: "Divider",
        description: "A thin, static multicolor-free hairline to separate sections.",
        imageUrl:
          "https://capsule-render.vercel.app/api?type=rect&color=d1d5db&height=2&section=header",
        codeSnippet:
          '<img src="https://capsule-render.vercel.app/api?type=rect&color=d1d5db&height=2&section=header" width="100%" />',
      },
    },
  },
  {
    id: "retro",
    name: "Retro",
    description:
      "Warm vintage arcade energy — sunset oranges and creams with a chunky pixel-friendly header and a classic divider.",
    colors: ["FF6F3C", "F4A259", "FFE6A7"],
    components: {
      banner: {
        title: "Banner",
        description: "Retro sunset gradient header with a bold display font.",
        imageUrl:
          "https://capsule-render.vercel.app/api?type=slice&color=0:FF6F3C,100:F4A259&height=200&section=header&text={repo}&fontColor=2b2118&fontSize=52&fontAlignY=60&desc=Insert%20Coin%20to%20Continue&descAlignY=80&descSize=16&rotate=13",
        codeSnippet:
          '<img src="https://capsule-render.vercel.app/api?type=slice&color=0:FF6F3C,100:F4A259&height=200&section=header&text={repo}&fontColor=2b2118&fontSize=52&fontAlignY=60&desc=Insert%20Coin%20to%20Continue&descAlignY=80&descSize=16&rotate=13" width="100%" />',
      },
      badges: {
        title: "Badges",
        description: "Plastic-style badges in warm retro oranges and cream.",
        imageUrl:
          "https://img.shields.io/badge/made_with-pixels-FF6F3C?style=plastic&labelColor=2b2118",
        codeSnippet: [
          "![Made with Pixels](https://img.shields.io/badge/made_with-pixels-FF6F3C?style=plastic&labelColor=2b2118)",
          "![Stars](https://img.shields.io/github/stars/{username}/{repo}?style=plastic&color=F4A259&labelColor=2b2118)",
          "![License](https://img.shields.io/badge/license-MIT-FFE6A7?style=plastic&labelColor=2b2118)",
        ].join("\n"),
      },
      divider: {
        title: "Divider",
        description: "A warm fading line that complements the retro palette.",
        imageUrl:
          "https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif",
        codeSnippet:
          '<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%" />',
      },
    },
  },
];

/**
 * Build a single ready-to-paste Markdown block for an entire pack
 * (banner → badges → divider), with placeholders substituted.
 */
export function buildPackMarkdown(
  pack: ThemePack,
  username: string,
  repo: string
): string {
  const { banner, badges, divider } = pack.components;
  const block = [
    `<!-- ${pack.name} Theme Pack — via README Design Kit -->`,
    banner.codeSnippet,
    "",
    badges.codeSnippet,
    "",
    divider.codeSnippet,
    "",
  ].join("\n");

  return block
    .replace(/\{username\}/g, username || "your-username")
    .replace(/\{repo\}/g, repo || "your-repo");
}
