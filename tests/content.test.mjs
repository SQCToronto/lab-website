import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { researchThemes } from '../src/data/research.mjs';
import { people } from '../src/data/people.mjs';
import { publications } from '../src/data/publications.mjs';

test('publishes the four approved research themes', () => {
  assert.deepEqual(researchThemes.map(({ title }) => title), [
    'Autonomous Quantum Protection',
    'Decoherence in New Regimes',
    'Gates for Hardware-efficient QEC',
    'Directional Open-System Dynamics',
  ]);
  assert.ok(researchThemes.every((theme) => theme.detail && theme.detail !== theme.summary));
});

test('publishes the current SQT Lab roster with updated roles', () => {
  const expectedCurrentMembers = [
    ['Chen Wang', 'principal-investigator', 'Associate Professor'],
    ['Sean van Geldern', 'postdoctoral', 'Postdoctoral Associate'],
    ['Baojie Liu', 'research-scientist', 'Research Scientist'],
    ['Carlos Sanchez Cruz', 'graduate', 'Graduate student'],
    ['Layla Saraj', 'graduate', 'Graduate student'],
    ['Ian Dong', 'undergraduate', 'Undergraduate student'],
    ['Berke Basak', 'undergraduate', 'Undergraduate student'],
  ];

  for (const [name, group, role] of expectedCurrentMembers) {
    assert.ok(people.some((person) => person.name === name && person.group === group && person.role === role), name);
  }
});

test('keeps former members only in alumni with their next destinations', () => {
  const expectedAlumni = [
    ['Yingying Wang', 'Juliang Guangqi'],
    ['Shruti Shirol', 'Q-CTRL'],
    ['Ben Kuchma', 'MIT Physics'],
    ['Alison Irwin', 'UMass Chan Medical School'],
    ['Jiayi Sun', 'Stanford Applied Physics'],
  ];

  for (const [name, destination] of expectedAlumni) {
    assert.ok(people.some((person) => person.name === name && person.group === 'alumni' && person.destination === destination), name);
    assert.ok(!people.some((person) => person.name === name && person.group !== 'alumni'), `${name} is not listed as active`);
  }
});

test('uses the approved figures for the first three research themes', () => {
  const protection = researchThemes.find((theme) => theme.id === 'autonomous-quantum-protection');
  const decoherence = researchThemes.find((theme) => theme.id === 'decoherence-in-new-regimes');
  const errorCorrection = researchThemes.find((theme) => theme.id === 'hardware-efficient-quantum-error-correction');

  assert.equal(protection?.image, '/images/research/passive-qec-wigner.png');
  assert.ok(protection?.projects.some((project) => project.url.includes('PRXQuantum.4.020319')));
  assert.equal(decoherence?.image, '/images/research/tls-charge-states-clean.png');
  assert.match(decoherence?.detail ?? '', /quasiparticles, radiation/);
  assert.match(decoherence?.detail ?? '', /two-timescale relaxometry/);
  assert.match(decoherence?.detail ?? '', /joint mapping of charge-parity and TLS states/);
  assert.equal(decoherence?.images, undefined);
  assert.equal(errorCorrection?.image, '/images/research/g-f-erasure-qubit.jpg');
  assert.equal(researchThemes.find((theme) => theme.id === 'directional-open-system-dynamics')?.image, '/images/research/nonreciprocity-clean.png');
});

test('includes the complete migrated publication eras', () => {
  for (const year of [2026, 2025, 2024, 2023, 2022, 2021, 2019, 2018, 2016]) {
    assert.ok(publications.some((publication) => publication.year === year), String(year));
  }
});

test('all declared images are stored locally', async () => {
  const paths = [
    ...researchThemes.flatMap(({ image, images = [] }) => [image, ...images].filter(Boolean)),
    ...people.flatMap(({ image }) => image ? [image] : []),
  ];

  for (const image of paths) {
    assert.match(image, /^\/images\//);
    await access(fileURLToPath(new URL(`../public${image}`, import.meta.url)));
  }
});
