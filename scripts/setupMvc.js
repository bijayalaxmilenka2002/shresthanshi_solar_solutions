import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Models
copyDir('src/types', 'src/models/types');
copyDir('src/data', 'src/models/data');
copyDir('src/services', 'src/models/services');

// 2. Views
copyDir('src/components', 'src/views/components');
copyDir('src/features', 'src/views/pages');

// 3. Controllers
copyDir('src/hooks', 'src/controllers/hooks');

console.log('MVC directories populated successfully');
