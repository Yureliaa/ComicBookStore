'use client';

import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import type { NewOrder, OrderComic, OrderCustomer } from '../../types/order';
import OrderDetails from './OrderDetails';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

interface Props {
  customers: OrderCustomer[];
  comics: OrderComic[];
}

type View = { name: 'list' } | { name: 'details'; orderId: number } | { name: 'new' };

export default function OrdersPage({ customers, comics }: Props) {
  const { orders, addOrder, updateStatus } = useOrders();
  const [view, setView] = useState<View>({ name: 'list' });

  const handleCreate = (data: NewOrder) => {
    addOrder(data);
    setView({ name: 'list' });
  };

  if (view.name === 'new') {
    return (
      <OrderForm
        customers={customers}
        comics={comics}
        onSubmit={handleCreate}
        onCancel={() => setView({ name: 'list' })}
      />
    );
  }

  if (view.name === 'details') {
    const order = orders.find((o) => o.id === view.orderId);
    if (order) {
      return (
        <OrderDetails
          order={order}
          customers={customers}
          comics={comics}
          onStatusChange={updateStatus}
          onBack={() => setView({ name: 'list' })}
        />
      );
    }
  }

  return (
    <>
      <button type="button" onClick={() => setView({ name: 'new' })}>
        New order
      </button>
      <OrderList
        orders={orders}
        customers={customers}
        onStatusChange={updateStatus}
        onSelect={(orderId) => setView({ name: 'details', orderId })}
      />
    </>
  );
}