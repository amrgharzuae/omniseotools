// scripts/audit-registry.mjs
import fs from 'fs';
import path from 'path';

const registryContent = fs.readFileSync('src/config/tools-registry.ts', 'utf8');

// 1. Inline slugs (handles quoted and unquoted keys)
const inlineSlugs = [...registryContent.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)].map(m => m[1]);

// 2. Imported module slugs
const importMatches = [...registryContent.matchAll(/from\s+["'](\.\/tools\/[^"']+)["']/g)].map(m => m[1]);
const importedSlugs = [];

importMatches.forEach(relPath => {
    const possible = [
        path.join('src/config', relPath + '.ts'),
        path.join('src/config', relPath + '.tsx'),
        path.join('src/config', relPath + '/index.ts'),
    ];
    const file = possible.find(p => fs.existsSync(p));
    if (file) {
        const txt = fs.readFileSync(file, 'utf8');
        const match = txt.match(/["']?slug["']?\s*:\s*["']([^"']+)["']/);
        if (match) importedSlugs.push(match[1]);
    }
});

const allSlugs = [...new Set([...inlineSlugs, ...importedSlugs])];

// 3. Physical standalone folders on disk
const hubDirs = ['content', 'developer', 'marketing', 'seo', 'social'];
const physicalToolDirs = fs.readdirSync('src/app/(site)/tools', { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('[') && !hubDirs.includes(d.name))
    .map(d => d.name);

const unreferenced = physicalToolDirs.filter(d => !allSlugs.includes(d));

console.log(`\n========================================`);
console.log(`🛡️  OMNISEO REGISTRY INTEGRITY REPORT`);
console.log(`========================================`);
console.log(`Registered Tools Count : ${allSlugs.length}`);
console.log(`Physical Standalone Dirs: ${physicalToolDirs.length}`);

let failed = false;

if (allSlugs.length < 50) {
    console.error(`❌ REGRESSION: Found ${allSlugs.length} tools, expected 50.`);
    failed = true;
}

if (unreferenced.length > 0) {
    console.error(`❌ UNLINKED DIRECTORIES: Physical folders without registry entry:`, unreferenced);
    failed = true;
}

if (failed) {
    process.exit(1);
} else {
    console.log(`✅ All 50 tools registered and correctly mapped!\n`);
    process.exit(0);
}