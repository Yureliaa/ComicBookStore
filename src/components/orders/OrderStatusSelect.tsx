import { ORDER_STATUSES } from '../../types/order';
import type { OrderStatus } from '../../types/order';

interface Props {
  orderId: number;
  value: OrderStatus;
  onChange: (orderId: number, status: OrderStatus) => void;
}

export default function OrderStatusSelect({ orderId, value, onChange }: Props) {
  const selectId = `order-status-${orderId}`;

  return (
    <>
      <label htmlFor={selectId} className="visually-hidden">
        Status of order {orderId}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(orderId, e.target.value as OrderStatus)}
      >
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </>
  );
}