import test from 'node:test';
import assert from 'node:assert/strict';
import { researchThemes } from '../src/data/research.mjs';
import { people } from '../src/data/people.mjs';
import { publications } from '../src/data/publications.mjs';

test('publishes the four approved research themes', () => {
  assert.deepEqual(researchThemes.map(({ title }) => title), [
    'Autonomous Quantum Protection',
    'Decoherence in New Regimes',
    'Hardware-Efficient Quantum Error Correction',
    'Directional Open-System Dynamics',
  ]);
});

test('carries the current roster forward', () => {
  for (const name of ['Chen Wang', 'Yingying Wang', 'Sean van Geldern', 'Shruti Shirol', 'Tanvir Masum', 'Hanzhe Xi', 'Zetong Zhuang', 'Manthan Badbaria', 'Baojie Liu']) {
    assert.ok(people.some((person) => person.name === name && person.group !== 'alumni'), name);
  }
});

test('includes the complete migrated publication eras', () => {
  for (const year of [2026, 2025, 2024, 2023, 2022, 2021, 2019, 2018, 2016]) {
    assert.ok(publications.some((publication) => publication.year === year), String(year));
  }
});
