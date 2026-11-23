import type { Order, OrderComic, OrderCustomer, OrderStatus } from '../../types/order';
import OrderStatusSelect from './OrderStatusSelect';

interface Props {
  order: Order;
  customers: OrderCustomer[];
  comics: OrderComic[];
  onStatusChange: (orderId: number, status: OrderStatus) => void;
  onBack: () => void;
}

export default function OrderDetails({ order, customers, comics, onStatusChange, onBack }: Props) {
  const customer = customers.find((c) => c.id === order.customerId);
  const items = order.comicIds.map((id) => comics.find((c) => c.id === id));

  return (
    <section aria-labelledby="order-details-heading">
      <button type="button" onClick={onBack}>
        ← Back to orders
      </button>
      <h2 id="order-details-heading">Order #{order.id}</h2>
      <dl>
        <dt>Customer</dt>
        <dd>{customer?.name ?? `Customer #${order.customerId}`}</dd>
        <dt>Date</dt>
        <dd>{order.date}</dd>
        <dt>Status</dt>
        <dd>
          <OrderStatusSelect orderId={order.id} value={order.status} onChange={onStatusChange} />
        </dd>
        <dt>Total</dt>
        <dd>{order.total.toFixed(2)} €</dd>
      </dl>

      <h3>Comic books</h3>
      <ul>
        {items.map((comic, index) => (
          <li key={`${order.comicIds[index]}-${index}`}>
            {comic
              ? `${comic.title} (${comic.price.toFixed(2)} €)`
              : `Comic #${order.comicIds[index]} (not in catalogue)`}
          </li>
        ))}
      </ul>
    </section>
  );
}