"use client";

import Sidebar from '@/app/components/AdminPage/Sidebar';
import OrderTable from '@/app/components/AdminPage/OrdersTable';
import { RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/app/components/Header';

export type Order = {
    id: string;
    createdAt: string;
    price: number;
    phone: string;
    shippingAddress: string;
    status: string;
    user: { username: string };
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Array<Order> | null>(null);
    const auth_token = useSelector((state: RootState) => state.auth.access_token);
  
    useEffect(() => { 
      async function getOrders() {
        const access_token = localStorage.getItem("auth_token");
          await fetch("https://website-backend-e2kt.onrender.com/product", {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
          }).then((response: Response) => response.json())
          .then(data => {
              setOrders(data);
          })
      }
  
      getOrders();
    }, []);
  
  return (
    <div className="admin-page">
      <Header />
      <Sidebar />
      <main>
        <h1>Поръчки</h1>
        <OrderTable orders={orders!} />
      </main>
    </div>
  );
}
