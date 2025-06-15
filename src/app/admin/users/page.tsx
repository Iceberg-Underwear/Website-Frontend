"use client";

import Sidebar from '@/app/components/AdminPage/Sidebar';
import UserTable from '@/app/components/AdminPage/UsersTable';
import Header from '@/app/components/Header';
import { RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export type User = {
    id: string;
    username: string;
    email: string;
    phone: string;
    isAdmin: boolean;
};


export default function UsersPage() {

  const [users, setUsers] = useState<Array<User> | null>(null);
  const auth_token = useSelector((state: RootState) => state.auth.access_token);

  useEffect(() => {
    async function getUsers() {
        const access_token = localStorage.getItem("auth_token");
        await fetch("https://website-backend-e2kt.onrender.com/user", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        }).then((response: Response) => response.json())
        .then(data => {
            setUsers(data);
        })
    }

    getUsers();
  }, []);

  return (
    <div className="admin-page">
      <Header />
      <Sidebar />
      <main>
        <h1>Users</h1>
        <UserTable users={users!} />
      </main>
    </div>
  );
}
