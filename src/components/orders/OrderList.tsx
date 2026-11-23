import type { Order, OrderStatus } from '../../types/order';
import OrderStatusSelect from './OrderStatusSelect';

interface NamedCustomer {
  id: number;
  name: string;
}

interface Props {
  orders: Order[];
  customers: NamedCustomer[];
  onStatusChange: (orderId: number, status: OrderStatus) => void;
  onSelect: (orderId: number) => void;
}

export default function OrderList({ orders, customers, onStatusChange, onSelect }: Props) {
  const customerName = (id: number) =>
    customers.find((c) => c.id === id)?.name ?? `Customer #${id}`;

  return (
    <section aria-labelledby="orders-heading">
      <h2 id="orders-heading">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <button type="button" onClick={() => onSelect(o.id)}>
                    #{o.id}
                  </button>
                </td>
                <td>{customerName(o.customerId)}</td>
                <td>{o.date}</td>
                <td>
                  <OrderStatusSelect
                    orderId={o.id}
                    value={o.status}
                    onChange={onStatusChange}
                  />
                </td>
                <td>{o.total.toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}