import test from 'node:test';
import { glob, readFile, stat } from 'node:fs/promises';

test('all generated internal links and local assets resolve under the base path', async () => {
  for await (const file of glob('dist/**/*.html')) {
    const html = await readFile(file, 'utf8');

    for (const match of html.matchAll(/(?:href|src)="(\/lab-website\/[^"#?]*)/g)) {
      const relative = match[1].replace(/^\/lab-website\/?/, '');
      const candidate = relative.endsWith('/') ? `dist/${relative}index.html` : `dist/${relative}`;
      await stat(candidate);
    }
  }
});
