'use client';
import './OrdersTable.css';

type Order = {
  id: string;
  createdAt: string;
  price: number;
  phone: string;
  shippingAddress: string;
  status: string;
  user: { username: string };
};

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Дата</th><th>Потребител</th><th>Телефон</th><th>Адрес</th><th>Статус</th><th>Цена</th><th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map(o => (
          <tr key={o.id}>
            <td>{new Date(o.createdAt).toLocaleString()}</td>
            <td>{o.user?.username}</td>
            <td>{o.phone}</td>
            <td>{o.shippingAddress}</td>
            <td>{o.status}</td>
            <td>${o.price.toFixed(2)}</td>
            <td>
              <button>Редактирай</button>
              <button className="delete">Изтрий</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
