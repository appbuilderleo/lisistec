const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.resolve(__dirname, 'public', 'projects');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targets = [
  { name: 'medspa-hero.png', url: 'https://medspa-kappa.vercel.app/' },
  { name: 'convite-hero.png', url: 'https://convite-two-beige.vercel.app/' },
  { name: 'muliba-hero.png', url: 'https://muliba.vercel.app/' },
  { name: 'ccn-hero.png', url: 'https://ccnconsultores.com/' },
  { name: 'crm-hero.png', url: 'https://crm.ccnconsultores.com/login' },
  { name: 'facim-hero.png', url: 'https://maputofacim-kappa.vercel.app/en' },
];

for (const target of targets) {
  const outPath = path.join(outputDir, target.name);
  console.log(`Capturing ${target.name} from ${target.url}...`);
  try {
    execFileSync(edge, [
      '--headless=new',
      '--disable-gpu',
      '--window-size=1280,800',
      '--virtual-time-budget=6000',
      `--screenshot=${outPath}`,
      target.url
    ], { stdio: 'inherit', timeout: 30000 });
    console.log(`Saved ${target.name}`);
  } catch (err) {
    console.error(`Error capturing ${target.name}:`, err.message);
  }
}

console.log('Finished capturing screenshots.');
