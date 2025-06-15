'use client';
import { use } from 'react';
import './UserTable.css';

type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

export default function UserTable({ users }: { users: User[] }) {
    //console.log("Users to render: "+users[0].id);
  return (
    <>
    <table className="user-table">
      <thead>
        <tr>
          <th>Име</th><th>Email</th><th>Телефон</th><th>Админ</th><th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users && users?.map(u => (
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>{u.isAdmin ? 'Да' : 'Не'}</td>
            <td>
              <button>Редактирай</button>
              <button className="delete">Изтрий</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
