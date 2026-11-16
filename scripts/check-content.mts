// Lists every placeholder still in src/content/wedding.ts. Run: npm run check:content
import { listPlaceholders } from '../src/content/wedding.ts';

const remaining = listPlaceholders();
for (const { path, text } of remaining) console.log(`${path.padEnd(48)} ${text.slice(0, 60)}`);
console.log(remaining.length ? `\n${remaining.length} placeholders left.` : 'No placeholders left.');
