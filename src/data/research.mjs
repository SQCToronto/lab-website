export const researchThemes = [
  {
    id: 'autonomous-quantum-protection',
    title: 'Autonomous Quantum Protection',
    summary: 'We use reservoir engineering and bosonic encodings to stabilize fragile quantum states and realize autonomous protection against dominant errors.',
    eyebrow: 'Stabilization',
    image: '/images/research/passive-qec-wigner.png',
    imageAlt: 'Wigner-function reconstruction of a passively protected bosonic quantum state.',
    projects: [
      {
        title: 'Passive Quantum Error Correction of Photon Loss at Breakeven',
        url: 'https://journals.aps.org/prx/abstract/10.1103/nvbm-97vs',
      },
      {
        title: 'Protecting a Bosonic Qubit with Autonomous Quantum Error Correction',
        url: 'https://www.nature.com/articles/s41586-021-03257-0',
      },
      {
        title: 'Experimental Realization and Characterization of Stabilized Pair Coherent States',
        url: 'https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.4.020319',
      },
    ],
  },
  {
    id: 'decoherence-in-new-regimes',
    title: 'Decoherence in New Regimes',
    summary: 'We investigate two-level systems and other microscopic loss mechanisms in emerging superconducting circuits and previously unexplored parameter regimes.',
    eyebrow: 'Spectroscopy',
    image: '/images/research/tls-charge-states-figure-1a.png',
    imageAlt: 'Repeated spectroscopy of a superconducting qubit revealing discrete charge-state fluctuations, adapted from Figure 1a of Liu et al., arXiv:2401.12183.',
    imageDisplay: 'figure-1a',
    projects: [
      {
        title: 'Non-Markovian Relaxation Spectroscopy of Fluxonium Qubits',
        url: 'https://www.nature.com/articles/s41467-026-69910-2',
      },
      {
        title: 'Observation of Discrete Charge States of a Coherent Two-Level System in a Superconducting Qubit',
        url: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.133.160602',
      },
    ],
  },
  {
    id: 'hardware-efficient-quantum-error-correction',
    title: 'Hardware-Efficient Quantum Error Correction',
    summary: 'We develop erasure qubits, efficient multi-qubit gates, and architectures that reduce the physical resources required for reliable quantum computation.',
    eyebrow: 'Error correction',
    image: '/images/lab/g-f-erasure-qubit.jpg',
    imageAlt: 'Circuit and energy-level schematic for a superconducting transmon erasure-qubit architecture.',
    projects: [
      {
        title: 'Hardware-Efficient Erasure Qubits With Superconducting Transmon Qutrits',
        url: 'https://arxiv.org/abs/2604.08672',
      },
      {
        title: 'Demonstration of the Two-Fluxonium Cross-Resonance Gate',
        url: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.20.024011',
      },
    ],
  },
  {
    id: 'directional-open-system-dynamics',
    title: 'Directional Open-System Dynamics',
    summary: 'We engineer dissipation and nonreciprocity to control how quantum information and excitations flow through circuit-QED systems.',
    eyebrow: 'Nonreciprocity',
    image: '/images/research/nonreciprocity.png',
    imageAlt: 'Circuit-QED diagram illustrating directional open-system dynamics.',
    projects: [
      {
        title: 'Dispersive Nonreciprocity between a Qubit and a Cavity',
        url: 'https://www.science.org/doi/full/10.1126/sciadv.adj8796',
      },
      {
        title: 'Quantum Nonreciprocal Interactions via Dissipative Gauge Symmetry',
        url: 'https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.4.010306',
      },
    ],
  },
];
