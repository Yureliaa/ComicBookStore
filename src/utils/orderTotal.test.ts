import { describe, it, expect } from 'vitest';
import { calculateTotal } from './orderTotal';

const comics = [
  { id: 1, price: 12.5 },
  { id: 2, price: 12.0 },
  { id: 3, price: 9.9 },
];

describe('calculateTotal', () => {
  it('sums the prices of the ordered comics', () => {
    expect(calculateTotal([1, 2], comics)).toBe(24.5);
  });

  it('returns 0 for an empty order', () => {
    expect(calculateTotal([], comics)).toBe(0);
  });

  it('ignores ids that are not in the catalogue', () => {
    expect(calculateTotal([1, 99], comics)).toBe(12.5);
  });

  it('avoids floating point errors', () => {
    expect(calculateTotal([3, 3, 3], comics)).toBe(29.7);
  });
});
