import { useState } from 'react';
import { initialOrders } from '../data/initialOrders';
import type { NewOrder, Order, OrderStatus } from '../types/order';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (data: NewOrder) => {
    setOrders((prev) => {
      const nextId = prev.reduce((max, o) => Math.max(max, o.id), 0) + 1;
      return [...prev, { ...data, id: nextId }];
    });
  };

  const updateStatus = (orderId: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  return { orders, addOrder, updateStatus };
}