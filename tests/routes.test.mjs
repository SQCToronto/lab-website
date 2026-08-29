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

test('people page carries the active roster and alumni', async () => {
  const html = await readFile('dist/people/index.html', 'utf8');
  for (const name of ['Chen Wang', 'Yingying Wang', 'Baojie Liu', 'Jeffrey Gertler']) assert.match(html, new RegExp(name));
});

test('publications page preserves recent and landmark work', async () => {
  const html = await readFile('dist/publications/index.html', 'utf8');
  for (const title of ['Hardware-Efficient Erasure Qubits', 'Passive Quantum Error Correction', 'A Schrodinger cat living in two boxes']) assert.match(html, new RegExp(title, 'i'));
});
