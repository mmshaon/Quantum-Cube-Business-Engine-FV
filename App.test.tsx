
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('Quantum Cube Business Engine', () => {
  it('renders the main dashboard by default', () => {
    render(<App />);
    expect(screen.getByText(/Quantum Cube/i)).toBeInTheDocument();
    // Fixed: Updated expected text from "Growth Projection" to "Growth Spectrum" to match Dashboard.tsx
    expect(screen.getByText(/Growth Spectrum/i)).toBeInTheDocument();
  });

  it('contains the navigation sidebar', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Fixed: Updated expected text from "Idea Lab" to "Ideas Incubator" to match constants.tsx
    expect(screen.getByText(/Ideas Incubator/i)).toBeInTheDocument();
    expect(screen.getByText(/Strategy Room/i)).toBeInTheDocument();
  });

  it('displays the user header information', () => {
    render(<App />);
    expect(screen.getByText(/Chief Executive/i)).toBeInTheDocument();
  });
});
