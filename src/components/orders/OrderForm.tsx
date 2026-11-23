import { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewOrder, OrderComic, OrderCustomer } from '../../types/order';
import { calculateTotal } from '../../utils/orderTotal';

interface Props {
  customers: OrderCustomer[];
  comics: OrderComic[];
  onSubmit: (order: NewOrder) => void;
  onCancel: () => void;
}

export default function OrderForm({ customers, comics, onSubmit, onCancel }: Props) {
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [comicIds, setComicIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ customer?: string; comics?: string }>({});

  const total = calculateTotal(comicIds, comics);

  const toggleComic = (id: number) => {
    setComicIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { customer?: string; comics?: string } = {};
    if (customerId === '') newErrors.customer = 'Select a customer.';
    if (comicIds.length === 0) newErrors.comics = 'Select at least one comic book.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0 || customerId === '') return;

    onSubmit({
      customerId,
      comicIds,
      status: 'New',
      date: new Date().toISOString().slice(0, 10),
      total,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="order-form-heading">
      <h2 id="order-form-heading">New order</h2>

      <div>
        <label htmlFor="order-customer">Customer</label>
        <select
          id="order-customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value === '' ? '' : Number(e.target.value))}
          aria-invalid={errors.customer ? true : undefined}
          aria-describedby={errors.customer ? 'order-customer-error' : undefined}
        >
          <option value="">Select customer…</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.customer && (
          <p id="order-customer-error" role="alert">
            {errors.customer}
          </p>
        )}
      </div>

      <fieldset aria-describedby={errors.comics ? 'order-comics-error' : undefined}>
        <legend>Comic books</legend>
        {comics.map((c) => (
          <div key={c.id}>
            <input
              type="checkbox"
              id={`order-comic-${c.id}`}
              checked={comicIds.includes(c.id)}
              onChange={() => toggleComic(c.id)}
            />
            <label htmlFor={`order-comic-${c.id}`}>
              {c.title} ({c.price.toFixed(2)} €)
            </label>
          </div>
        ))}
        {errors.comics && (
          <p id="order-comics-error" role="alert">
            {errors.comics}
          </p>
        )}
      </fieldset>

      <p aria-live="polite">
        <strong>Total: {total.toFixed(2)} €</strong>
      </p>

      <button type="submit">Create order</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}