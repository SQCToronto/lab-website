import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('home build includes the shared identity and six base-safe destinations', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /Wang Lab/);
  for (const route of ['research', 'people', 'publications', 'news', 'join']) {
    assert.match(html, new RegExp(`href="/lab-website/${route}/?"`));
  }
});
