
export function analyzeReadmeQuality(content: string) {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const passed: string[] = [];

  const lines = content.split("\n");

  /* ---------------------------
     HEADINGS ANALYSIS
  ---------------------------- */
  const headingRegex = /^(#{1,6})\s+(.*)$/;
  const headings = lines
    .map((line) => {
      const match = line.match(headingRegex);
      if (!match) return null;
      return {
        level: match[1].length,
        text: match[2].trim(),
      };
    })
    .filter(Boolean) as { level: number; text: string }[];

  /* Skipped heading level check */
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      warnings.push("Skipped heading level");
      break;
    }
  }
  if (!warnings.includes("Skipped heading level")) {
    passed.push("Heading hierarchy looks good");
  }

  /* ---------------------------
     SECTION DETECTION (emoji-safe)
  ---------------------------- */
  const lowerHeadings = headings.map((h) => h.text.toLowerCase());

  const hasInstallation = lowerHeadings.some((h) =>
    h.includes("installation")
  );
  const hasUsage = lowerHeadings.some((h) =>
    h.includes("usage")
  );

  if (!hasInstallation) {
    suggestions.push("Missing Installation");
  } else {
    passed.push("Installation section present");
  }

  if (!hasUsage) {
    suggestions.push("Missing Usage");
  } else {
    passed.push("Usage section present");
  }

  /* ---------------------------
     EMOJI CHECK
  ---------------------------- */
  const emojiRegex =
    /[\p{Extended_Pictographic}]/gu;

  const emojiMatches = content.match(emojiRegex) || [];

  if (emojiMatches.length > 10) {
    warnings.push("Too many emojis");
  } else {
    passed.push("Emoji usage looks balanced");
  }

  /* ---------------------------
     IMAGE ALT TEXT CHECK
  ---------------------------- */
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  let imageWithoutAlt = false;

  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    if (!match[1] || match[1].trim() === "") {
      imageWithoutAlt = true;
      break;
    }
  }

  if (imageWithoutAlt) {
    warnings.push("Image missing alt text");
  } else {
    passed.push("All images have alt text");
  }

  /* ---------------------------
     TITLE CHECK
  ---------------------------- */
  if (headings.length === 0 || headings[0].level !== 1) {
    warnings.push("README should start with a level-1 title");
  } else {
    passed.push("README has a proper title");
  }

  return {
    warnings,
    suggestions,
    passed,
  };
}
