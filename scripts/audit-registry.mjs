// scripts/audit-registry.mjs
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const registryPath = path.resolve(rootDir, 'src/config/tools-registry.ts');

if (!fs.existsSync(registryPath)) {
    console.error(`❌ Could not locate tools-registry.ts at ${registryPath}`);
    process.exit(1);
}

const registryContent = fs.readFileSync(registryPath, 'utf8');

// 1. Parse inline slugs
const inlineSlugs = [...registryContent.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)].map(m => m[1]);

// 2. Resolve imported tool module slugs
const importMatches = [...registryContent.matchAll(/from\s+["'](\.\/tools\/[^"']+)["']/g)].map(m => m[1]);
const importedSlugs = [];

for (const relPath of importMatches) {
    // Normalize path relative to src/config/
    const cleanRel = relPath.replace(/^\.\//, '');
    const possiblePaths = [
        path.resolve(rootDir, 'src/config', `${cleanRel}.ts`),
        path.resolve(rootDir, 'src/config', `${cleanRel}.tsx`),
        path.resolve(rootDir, 'src/config', cleanRel, 'index.ts'),
        path.resolve(rootDir, 'src/config', cleanRel, 'index.tsx'),
    ];

    const foundPath = possiblePaths.find(p => fs.existsSync(p));
    if (foundPath) {
        const txt = fs.readFileSync(foundPath, 'utf8');
        const match = txt.match(/["']?slug["']?\s*:\s*["']([^"']+)["']/);
        if (match) {
            importedSlugs.push(match[1]);
        }
    } else {
        console.warn(`⚠️ Could not resolve import path: ${relPath}`);
    }
}

const allSlugs = [...new Set([...inlineSlugs, ...importedSlugs])];

// 3. Scan physical folders
const toolsDir = path.resolve(rootDir, 'src/app/(site)/tools');
const hubDirs = ['content', 'developer', 'marketing', 'seo', 'social'];

const physicalToolDirs = fs.existsSync(toolsDir)
    ? fs.readdirSync(toolsDir, { withFileTypes: true })
        .filter(d => d.isDirectory() && !d.name.startsWith('[') && !hubDirs.includes(d.name))
        .map(d => d.name)
    : [];

const unreferenced = physicalToolDirs.filter(d => !allSlugs.includes(d));

console.log(`\n========================================`);
console.log(`🛡️  OMNISEO REGISTRY INTEGRITY REPORT`);
console.log(`========================================`);
console.log(`Registered Tools Count : ${allSlugs.length}`);
console.log(`Physical Standalone Dirs: ${physicalToolDirs.length}`);

let failed = false;

if (allSlugs.length < 50) {
    console.error(`❌ REGRESSION: Found ${allSlugs.length} tools, expected at least 50.`);
    failed = true;
}

if (unreferenced.length > 0) {
    console.error(`❌ UNLINKED DIRECTORIES: Physical folders without registry entry:`, unreferenced);
    failed = true;
}

if (failed) {
    process.exit(1);
} else {
    console.log(`✅ All ${allSlugs.length} tools registered and correctly mapped!\n`);
    process.exit(0);
}