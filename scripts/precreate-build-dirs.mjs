import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const srcApp = path.resolve(rootDir, "src/app");
const nextDir = path.resolve(rootDir, ".next");

function getAllDirs(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      const fullPath = path.join(dir, file.name);
      fileList.push(fullPath);
      getAllDirs(fullPath, fileList);
    }
  }
  return fileList;
}

const appDirs = getAllDirs(srcApp);
const prefixes = [
  path.join(nextDir, "server", "app"),
  path.join(nextDir, "types", "app"),
  path.join(nextDir, "static", "chunks", "app"),
];

for (const dir of appDirs) {
  const rel = path.relative(srcApp, dir);
  for (const prefix of prefixes) {
    const target = path.join(prefix, rel);
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
  }
}

console.log(`Pre-created all build directories for ${appDirs.length} route folders.`);

