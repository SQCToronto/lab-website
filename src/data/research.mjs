export const researchThemes = [
  {
    id: 'autonomous-quantum-protection',
    title: 'Autonomous Quantum Protection',
    summary: 'We use reservoir engineering and bosonic encodings to stabilize fragile quantum states and realize autonomous protection against dominant errors.',
    detail: 'We combine bosonic codes with driven, dissipative circuits so that the hardware can turn photon loss into a correctable process. The goal is a logical qubit whose protection is continuously supplied by the engineered environment, reducing the need to repeatedly measure errors and apply external feedback.',
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
    detail: 'Superconducting qubits can lose coherence through microscopic defects, charge and flux fluctuations, quasiparticles, radiation, and other environmental modes. We develop two-timescale relaxometry and joint mapping of charge-parity and TLS states to isolate individual channels and determine how their slow dynamics reshape qubit relaxation. The goal is to identify the mechanisms that limit emerging devices and guide their mitigation.',
    eyebrow: 'Spectroscopy',
    image: '/images/research/tls-charge-states-clean.png',
    imageAlt: 'Repeated spectroscopy revealing discrete charge-state fluctuations above a charge-sensitive energy-level diagram and a schematic of a coherent two-level system in a Josephson-junction tunnel barrier.',
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
    title: 'Gates for Hardware-efficient QEC',
    summary: 'We develop erasure qubits, efficient multi-qubit gates, and architectures that reduce the physical resources required for reliable quantum computation.',
    detail: 'We design qubits and gates around the errors hardware actually produces. Erasure encodings use extra energy levels to flag damaging relaxation events, while efficient multi-qubit gates and compact architectures aim to lower the overhead needed to turn physical devices into useful error-corrected processors.',
    eyebrow: 'Error correction',
    image: '/images/research/g-f-erasure-qubit.jpg',
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
    detail: 'Open quantum systems need not simply lose information: with tailored couplings and dissipation, they can control the direction of quantum interactions and stabilize useful dynamics. We use circuit-QED networks to explore nonreciprocity, protected transfer, and new ways of routing excitations through quantum hardware.',
    eyebrow: 'Nonreciprocity',
    image: '/images/research/nonreciprocity-clean.png',
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
