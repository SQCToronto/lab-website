import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('home build includes the SQT Lab identity and six base-safe destinations', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /Superconducting Qubit Toronto Lab/);
  assert.match(html, /SQT Lab/);
  for (const route of ['research', 'people', 'publications', 'news', 'join']) {
    assert.match(html, new RegExp(`href="/lab-website/${route}/?"`));
  }
});

test('home presents the accessible superconducting-circuit introduction and lab address', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /Superconducting circuits for protecting, processing, and directing quantum information\./);
  assert.match(html, /Superconducting quantum circuits are electrical devices/);
  assert.match(html, /60 St George St/);
  assert.match(html, /MP337/);
  assert.doesNotMatch(html, /Toronto<\/p>\s*<p>Department of Physics<br>University of Toronto<br>MP1023B/);
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

test('people page carries the updated roster and alumni', async () => {
  const html = await readFile('dist/people/index.html', 'utf8');
  for (const name of ['Chen Wang', 'Sean van Geldern', 'Baojie Liu', 'Carlos Sanchez Cruz', 'Layla Saraj', 'Ian Dong', 'Berke Basak', 'Yingying Wang', 'Shruti Shirol']) assert.match(html, new RegExp(name));
  assert.match(html, /Postdoctoral associates and research scientist/);
  assert.ok(html.indexOf('Baojie Liu') < html.indexOf('Sean van Geldern'));
  assert.ok(html.indexOf('Former graduate students') < html.indexOf('Former postdoctoral associates') && html.indexOf('Former postdoctoral associates') < html.indexOf('Former undergraduate students'));
  assert.doesNotMatch(html, /images\/people\/yingying-wang\.jpg/);
  assert.doesNotMatch(html, /images\/people\/shruti-shirol\.jpg/);
  for (const image of ['Group-photo-2017.jpg', 'Group-photo-2019.jpg', 'Group-photo-2021.jpg', 'group-photo-2023.jpg', 'Group-photo-2023b.jpg', 'group-photo-2025.jpg', 'Group-photo-2026.jpg', 'Group-photo-2026b.jpg']) assert.match(html, new RegExp(image));
});

test('publications page preserves recent and landmark work', async () => {
  const html = await readFile('dist/publications/index.html', 'utf8');
  for (const title of ['Hardware-Efficient Erasure Qubits', 'Passive Quantum Error Correction', 'A Schrodinger cat living in two boxes']) assert.match(html, new RegExp(title, 'i'));
});

test('news page records the Toronto launch, construction progress, and current paper figures', async () => {
  const html = await readFile('dist/news/index.html', 'utf8');
  for (const text of ['A living record of the lab.', 'University of Toronto', 'Passive Quantum Error Correction', 'Hardware-Efficient Erasure Qubits', 'mechanical structure and utility backbone']) assert.match(html, new RegExp(text));
  for (const image of ['AQEC-breakeven.jpg', 'g-f-erasure-qubit.jpg', 'Non-Markovian-TLS.png', 'Lab-construction-August.jpeg']) assert.match(html, new RegExp(image));
});

test('join page points applicants to Toronto', async () => {
  const html = await readFile('dist/join/index.html', 'utf8');
  assert.match(html, /postdoctoral/i);
  assert.match(html, /graduate/i);
  assert.match(html, /physics\.utoronto\.ca/);
  assert.doesNotMatch(html, /apply.*UMass/i);
});
