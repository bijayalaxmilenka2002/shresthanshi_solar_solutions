import fs from 'fs';
import path from 'path';

const SRC = path.resolve('src');

// Ensure destination directories exist
const modelsDir = path.join(SRC, 'models');
const viewsDir = path.join(SRC, 'views');
const controllersDir = path.join(SRC, 'controllers');

[modelsDir, viewsDir, controllersDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function moveDir(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    if (fs.existsSync(newPath)) {
      fs.rmSync(newPath, { recursive: true, force: true });
    }
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${oldPath} -> ${newPath}`);
  }
}

// 1. Move directories
moveDir(path.join(SRC, 'data'), path.join(modelsDir, 'data'));
moveDir(path.join(SRC, 'services'), path.join(modelsDir, 'services'));
moveDir(path.join(SRC, 'types'), path.join(modelsDir, 'types'));

moveDir(path.join(SRC, 'components'), path.join(viewsDir, 'components'));
moveDir(path.join(SRC, 'features'), path.join(viewsDir, 'pages'));

moveDir(path.join(SRC, 'hooks'), path.join(controllersDir, 'hooks'));

// 2. Helper to recursively list all files
function getAllFiles(dir, exts = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getAllFiles(SRC);
console.log(`Scanning ${allFiles.length} files to update import paths...`);

// 3. Rewrite imports to use clean @models, @views, @controllers, @/app aliases
let updatedCount = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace data imports:
  // e.g. from '../data/company' or '../../data/company' or './data/company'
  content = content.replace(/from\s+['"](?:\.\.?\/)+data\/([^'"]+)['"]/g, "from '@models/data/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+data\/([^'"]+)['"]\s*\)/g, "import('@models/data/$1')");

  // Replace services imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+services\/([^'"]+)['"]/g, "from '@models/services/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+services\/([^'"]+)['"]\s*\)/g, "import('@models/services/$1')");

  // Replace types imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+types(?:\/index)?['"]/g, "from '@models/types'");
  content = content.replace(/from\s+['"](?:\.\.?\/)+types\/([^'"]+)['"]/g, "from '@models/types/$1'");

  // Replace components imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+components\/([^'"]+)['"]/g, "from '@views/components/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+components\/([^'"]+)['"]\s*\)/g, "import('@views/components/$1')");

  // Replace features/pages imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+features\/([^'"]+)['"]/g, "from '@views/pages/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+features\/([^'"]+)['"]\s*\)/g, "import('@views/pages/$1')");

  // Replace hooks imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+hooks\/([^'"]+)['"]/g, "from '@controllers/hooks/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+hooks\/([^'"]+)['"]\s*\)/g, "import('@controllers/hooks/$1')");

  // Replace app imports:
  content = content.replace(/from\s+['"](?:\.\.?\/)+app\/([^'"]+)['"]/g, "from '@/app/$1'");
  content = content.replace(/import\s*\(\s*['"](?:\.\.?\/)+app\/([^'"]+)['"]\s*\)/g, "import('@/app/$1')");

  // Replace styles imports if any:
  content = content.replace(/from\s+['"](?:\.\.?\/)+styles\/([^'"]+)['"]/g, "from '@/styles/$1'");
  content = content.replace(/import\s+['"](?:\.\.?\/)+styles\/([^'"]+)['"]/g, "import '@/styles/$1'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  }
}

console.log(`Updated imports in ${updatedCount} files.`);
