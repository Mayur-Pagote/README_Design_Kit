
const FILE_ICONS: Record<string, string> = {
  // Languages
  'ts': '📄',
  'tsx': '⚛️',
  'js': '📜',
  'jsx': '⚛️',
  'json': '📦',
  'css': '🎨',
  'scss': '🎨',
  'html': '📄',
  'md': '📝',
  'py': '🐍',
  'go': '🐹',
  'rs': '🦀',
  'java': '☕',
  'c': '🇨',
  'cpp': '🇨',
  'h': '📋',
  'rb': '💎',
  'php': '🐘',
  'vue': '🟢',
  'svelte': '🟠',
  'dart': '🎯',
  'yml': '⚙️',
  'yaml': '⚙️',
  'toml': '⚙️',
  'xml': '⚙️',
  'gradle': '🐘',
  'sql': '🗃️',
  'sh': '🐚',
  'bat': '🐚',
  'dockerfile': '🐳',
  'gitignore': '🚫',
  'env': '🔒',
  'license': '⚖️',
  'lock': '🔒',
  'sln': '🔧',
  'csproj': '🔷',

  // Configs
  'config': '⚙️',
  'settings': '⚙️',
  'rc': '⚙️',
};

const FOLDER_ICONS: Record<string, string> = {
  'src': '📂',
  'public': '📂',
  'assets': '📂',
  'components': '📂',
  'pages': '📂',
  'app': '📂',
  'api': '📂',
  'utils': '🛠️',
  'lib': '📚',
  'hooks': '🪝',
  'styles': '🎨',
  'test': '🧪',
  'tests': '🧪',
  'docs': '📚',
  'bin': '📦',
  'dist': '📦',
  'build': '📦',
  'node_modules': '📦',
  '.git': '🛑',
  '.github': '🐙',
  '.vscode': '🔧',
  'controllers': '🎮',
  'models': '🗄️',
  'views': '👁️',
  'routes': '🛣️',
  'services': '🔧',
  'config': '⚙️',
  'middleware': '🛡️',
  'migrations': '🔄',
  'types': '🏷️',
  'interfaces': '🏷️',
};

export const getIconForFile = (filename: string): string => {
  const lowerName = filename.toLowerCase();

  
  if (FILE_ICONS[lowerName]) return FILE_ICONS[lowerName];
  if (FILE_ICONS[lowerName.replace('.', '')]) return FILE_ICONS[lowerName.replace('.', '')];

  
  const ext = lowerName.split('.').pop();
  if (ext && FILE_ICONS[ext]) return FILE_ICONS[ext];

  return '📄';
};

export const getIconForFolder = (dirname: string): string => {
  const lowerName = dirname.toLowerCase();
  if (FOLDER_ICONS[lowerName]) return FOLDER_ICONS[lowerName];
  return '📂';
};


export const smartParseTree = (input: string): string => {
  if (!input.trim()) return '';

  const lines = input.split('\n');
  const processedLines = lines.map(line => {

    const treeCharsRegex = /^([│├─└\s]*)(.*)$/;
    const match = line.match(treeCharsRegex);

    if (!match) return line;

    const [, treePrefix, content] = match;
    const trimmedContent = content.trim();

    if (!trimmedContent) return line;


    const isFolder =
      trimmedContent.endsWith('/') ||
      !trimmedContent.includes('.') ||
      Object.keys(FOLDER_ICONS).includes(trimmedContent.toLowerCase());

    
    const icon = isFolder
      ? getIconForFolder(trimmedContent.replace('/', ''))
      : getIconForFile(trimmedContent);


    const hasIcon = /[\u{1F300}-\u{1F9FF}]/u.test(trimmedContent);
    const finalContent = hasIcon ? trimmedContent : `${icon} ${trimmedContent}`;

    return `${treePrefix}${finalContent}`;
  });

  return `\`\`\`bash\n${processedLines.join('\n')}\n\`\`\``;
};
