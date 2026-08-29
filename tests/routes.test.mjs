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

for (const [file, required] of [
  ['dist/index.html', ['Launching in Toronto', 'Autonomous Quantum Protection', 'Passive Quantum Error Correction']],
  ['dist/research/index.html', ['Decoherence in New Regimes', 'Hardware-Efficient Quantum Error Correction', 'Directional Open-System Dynamics']],
]) {
  test(`${file} contains its approved content`, async () => {
    const html = await readFile(file, 'utf8');
    for (const text of required) assert.match(html, new RegExp(text));
  });
}
