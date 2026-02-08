/**
 * Smartly adds icons to a project structure tree string based on file/directory names.
 * Formatting: [Prefix Symbols][Space][Emoji][Name]
 * Example: ├── 📂src/
 */

const EMOJI_ICONS: Record<string, string> = {
  // Directories
  'src': '📂',
  'components': '📂',
  'pages': '📂',
  'assets': '📂',
  'public': '📂',
  'utils': '📂',
  'hooks': '📂',
  'services': '📂',
  'styles': '📂',
  'api': '📂',
  'config': '⚙️',
  'tests': '📂',
  'data': '📂',
  'lib': '📂',
  'build': '🏗️',
  'dist': '🏗️',
  'node_modules': '📦',
  'scripts': '📜',
  'docs': '📂',
  'ios': '📱',
  'android': '📱',
  'github': '📂',
  '.github': '📂',
  'vscode': '📂',
  '.vscode': '📂',

  // Files - Languages/Frameworks
  'tsx': '⚛️',
  'jsx': '⚛️',
  'ts': '⚛️',
  'js': '📜',
  'html': '🌐',
  'css': '🎨',
  'scss': '🎨',
  'py': '🐍',
  'java': '☕',
  'kt': '🎯',
  'swift': '🍎',
  'go': '🐹',
  'rb': '💎',
  'php': '🐘',
  'c': '👾',
  'cpp': '👾',
  'cs': '🎮',
  'dart': '🎯',
  'vue': '💚',
  'svelte': '🔥',
  'rs': '🦀',

  // Files - Configs
  'json': '⚙️',
  'yml': '⚙️',
  'yaml': '⚙️',
  'xml': '⚙️',
  'env': '🔐',
  'gitignore': '⚙️',
  'dockerfile': '🐋',
  'package.json': '⚙️',
  'package-lock.json': '📦',
  'yarn.lock': '📦',
  'pnpm-lock.yaml': '📦',
  'vite.config.ts': '⚡',
  'tailwind.config.js': '🎨',
  'readme.md': '📄',
  'license': '⚖️',
  'makefile': '🛠️',

  // Files - Docs/Media
  'md': '📄',
  'txt': '📄',
  'pdf': '📕',
  'png': '🖼️',
  'jpg': '🖼️',
  'jpeg': '🖼️',
  'svg': '🖼️',
  'ico': '🖼️',
  'gif': '🖼️',
  'mp3': '🎵',
  'mp4': '🎬',
  'zip': '📦',
  'tar': '📦',
  'gz': '📦',
};

export const parseTreeAndAddIcons = (treeString: string): string => {
  if (!treeString) return '';

  const lines = treeString.split('\n');

  return lines.map(line => {
    // 1. Skip empty or whitespace-only lines
    if (!line.trim()) return line;

    // 2. Identify prefix (symbols) and name
    // The prefix consists of spaces and tree symbols like │, ├, ─, └, |, +, -, \, /
    const match = line.match(/^([│├─└┌┴\s\|\+\-\\\/]*)(.*)$/);
    if (!match) return line;

    let prefix = match[1];
    let rawName = match[2].trim();

    if (!rawName) return line;

    // 3. Detect existing emoji and return if present (to avoid double-stacking)
    // We check only the part AFTER the prefix to see if an icon is already added
    // Common emoji ranges, excluding box drawing symbols (which are in \u2500-\u257f)
    const emojiRegex = /(\u00a9|\u00ae|[\u2600-\u27bf]|[\u2b00-\u2bff]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    if (emojiRegex.test(rawName)) return line;

    // Handle root symbols
    if (rawName === '.' || rawName === '-') {
      const cleanPrefix = prefix.trimEnd();
      return `${cleanPrefix}${cleanPrefix ? ' ' : ''}📂 ${rawName}`;
    }

    // 4. Determine appropriate Icon
    const isDirectory = rawName.endsWith('/') || !rawName.includes('.');
    const cleanName = rawName.replace(/\/$/, '').toLowerCase();
    const extension = cleanName.includes('.') ? cleanName.split('.').pop()! : '';

    let icon = isDirectory ? '📂' : '📄';

    // File name or extension based matching
    if (EMOJI_ICONS[cleanName]) {
      icon = EMOJI_ICONS[cleanName];
    } else if (EMOJI_ICONS[extension]) {
      icon = EMOJI_ICONS[extension];
    }

    // 5. Reconstruct line with Proper Formatting
    // [Symbols] [Emoji][Name]
    const finalPrefix = prefix.trimEnd();
    const spaceOffset = finalPrefix ? ' ' : '';

    return `${finalPrefix}${spaceOffset}${icon}${rawName}`;
  }).join('\n');
};
