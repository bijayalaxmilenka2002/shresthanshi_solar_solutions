import fs from 'fs';
import path from 'path';

const SRC = path.resolve('src');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// 1. Re-export components from src/views/components
function proxyComponents(subDir = '') {
  const compDir = path.join(SRC, 'views', 'components', subDir);
  const targetDir = path.join(SRC, 'components', subDir);
  ensureDir(targetDir);

  const entries = fs.readdirSync(compDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      proxyComponents(path.join(subDir, entry.name));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const baseName = entry.name.replace(/\.tsx?$/, '');
      const proxyPath = path.join(targetDir, entry.name);
      const relativeImport = `@views/components/${subDir ? subDir.replace(/\\/g, '/') + '/' : ''}${baseName}`;
      const content = `export * from '${relativeImport}';\n`;
      fs.writeFileSync(proxyPath, content, 'utf-8');
    }
  }
}

// 2. Re-export features from src/views/pages
function proxyPages(subDir = '') {
  const pageDir = path.join(SRC, 'views', 'pages', subDir);
  const targetDir = path.join(SRC, 'features', subDir);
  ensureDir(targetDir);

  const entries = fs.readdirSync(pageDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      proxyPages(path.join(subDir, entry.name));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const baseName = entry.name.replace(/\.tsx?$/, '');
      const proxyPath = path.join(targetDir, entry.name);
      const relativeImport = `@views/pages/${subDir ? subDir.replace(/\\/g, '/') + '/' : ''}${baseName}`;
      const content = `export * from '${relativeImport}';\n`;
      fs.writeFileSync(proxyPath, content, 'utf-8');
    }
  }
}

// 3. Re-export services from src/models/services
function proxyServices() {
  const servDir = path.join(SRC, 'models', 'services');
  const targetDir = path.join(SRC, 'services');
  ensureDir(targetDir);

  const entries = fs.readdirSync(servDir);
  for (const file of entries) {
    if (file.endsWith('.ts')) {
      const baseName = file.replace(/\.ts$/, '');
      const proxyPath = path.join(targetDir, file);
      const content = `export * from '@models/services/${baseName}';\n`;
      fs.writeFileSync(proxyPath, content, 'utf-8');
    }
  }
}

// 4. Re-export data from src/models/data
function proxyData() {
  const dataDir = path.join(SRC, 'models', 'data');
  const targetDir = path.join(SRC, 'data');
  ensureDir(targetDir);

  const entries = fs.readdirSync(dataDir);
  for (const file of entries) {
    if (file.endsWith('.ts')) {
      const baseName = file.replace(/\.ts$/, '');
      const proxyPath = path.join(targetDir, file);
      const content = `export * from '@models/data/${baseName}';\n`;
      fs.writeFileSync(proxyPath, content, 'utf-8');
    }
  }
}

// 5. Re-export types
function proxyTypes() {
  const targetDir = path.join(SRC, 'types');
  ensureDir(targetDir);
  fs.writeFileSync(path.join(targetDir, 'index.ts'), `export * from '@models/types';\n`, 'utf-8');
}

// 6. Re-export hooks
function proxyHooks() {
  const hooksDir = path.join(SRC, 'controllers', 'hooks');
  const targetDir = path.join(SRC, 'hooks');
  ensureDir(targetDir);

  const entries = fs.readdirSync(hooksDir);
  for (const file of entries) {
    if (file.endsWith('.ts')) {
      const baseName = file.replace(/\.ts$/, '');
      const proxyPath = path.join(targetDir, file);
      const content = `export * from '@controllers/hooks/${baseName}';\n`;
      fs.writeFileSync(proxyPath, content, 'utf-8');
    }
  }
}

proxyComponents();
proxyPages();
proxyServices();
proxyData();
proxyTypes();
proxyHooks();

console.log('✅ All backwards-compatible proxies created successfully!');
