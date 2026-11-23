export type OrderStatus = 'New' | 'Processing' | 'Completed' | 'Cancelled';

export const ORDER_STATUSES: OrderStatus[] = ['New', 'Processing', 'Completed', 'Cancelled'];

export interface Order {
  id: number;
  customerId: number;
  comicIds: number[];
  status: OrderStatus;
  date: string; 
  total: number;
}

export type NewOrder = Omit<Order, 'id'>;

export interface OrderCustomer {
  id: number;
  name: string;
}

export interface OrderComic {
  id: number;
  title: string;
  price: number;
}