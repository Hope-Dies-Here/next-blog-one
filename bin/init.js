#!/usr/bin/env node

/**
 * npx next-blog init
 * Copies the blog feature files into the target Next.js project.
 * Usage: npx next-blog init [--src | --app]
 */

const fs = require('fs');
const path = require('path');

const AUTH_SRC = path.join(__dirname, '../auth');
const BLOG_SRC = path.join(__dirname, '../blog');
const STYLES_SRC = path.join(__dirname, '../styles');
const API_SRC = path.join(__dirname, '../api');
const LIB_SRC = path.join(__dirname, '../lib');
const PUBLIC_SRC = path.join(__dirname, '../public');
const COMPONENTS_SRC = path.join(__dirname, '../components/blog');
const UTILS_SRC = path.join(__dirname, '../utils');

const args = process.argv.slice(2);
const useSrc = args.includes('--src');
const useApp = args.includes('--app');

// Detect target folder
let targetAppFolder;
if (useSrc) {
  targetAppFolder = path.join(process.cwd(), 'src', 'app');
} else if (useApp) {
  targetAppFolder = path.join(process.cwd(), 'app');
} else {
  // Auto-detect
  if (fs.existsSync(path.join(process.cwd(), 'src', 'app'))) {
    targetAppFolder = path.join(process.cwd(), 'src', 'app');
  } else {
    targetAppFolder = path.join(process.cwd(), 'app');
  }
}

// Utility to copy folders recursively (force overwrite)
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      // Force overwrite if file exists
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy blog folder
copyRecursive(BLOG_SRC, path.join(targetAppFolder, 'blog'));
// Copy styles (to app/styles or src/app/styles)
copyRecursive(STYLES_SRC, path.join(targetAppFolder, 'styles'));
// Copy api (to app/api or src/app/api)
copyRecursive(API_SRC, path.join(targetAppFolder, 'api'));
// Copy lib (to app/lib or src/app/lib)
copyRecursive(LIB_SRC, path.join(targetAppFolder, 'lib'));

// Copy auth folder into api (force overwrite)
copyRecursive(AUTH_SRC, path.join(targetAppFolder, 'api', 'auth'));
// Copy utils folder
copyRecursive(UTILS_SRC, path.join(targetAppFolder, 'utils'));
copyRecursive(COMPONENTS_SRC, path.join(targetAppFolder, 'components'));

// Copy public assets (always to root-level public, force overwrite)
const targetPublicFolder = path.join(process.cwd(), 'public');
copyRecursive(PUBLIC_SRC, targetPublicFolder);

// Copy components/blog to components/blog (same level as app, force overwrite)
// const targetComponentsFolder = path.join(process.cwd(), 'components', 'blog');
// copyRecursive(COMPONENTS_SRC, targetComponentsFolder);

console.log(`✅ Blog feature files copied to ${targetAppFolder}/blog`);
console.log(`✅ Blog components copied to ${"TRUST ME"}`);
console.log(`✅ Auth API copied to ${path.join(targetAppFolder, 'api', 'auth')}`);
console.log(`✅ Public assets copied to ${targetPublicFolder}`);
console.log(`👉 You can now access your blog at /blog in your Next.js project.`);