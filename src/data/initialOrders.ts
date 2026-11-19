import type { Order } from '../types/order';

export const initialOrders: Order[] = [
  { id: 1, customerId: 1, comicIds: [1, 2], status: 'New', date: '2026-11-01', total: 24.5 },
  { id: 2, customerId: 2, comicIds: [3], status: 'Processing', date: '2026-11-03', total: 9.9 },
  { id: 3, customerId: 3, comicIds: [4, 5, 6], status: 'Completed', date: '2026-11-05', total: 41.0 },
  { id: 4, customerId: 4, comicIds: [7, 8], status: 'Cancelled', date: '2026-11-08', total: 28.5 },
  { id: 5, customerId: 5, comicIds: [9, 10, 1], status: 'Processing', date: '2026-11-12', total: 32.5 },
];
