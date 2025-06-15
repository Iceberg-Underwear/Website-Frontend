'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

export default function Sidebar() {
  const path = usePathname();
  const menu = [
    { label: 'Потребители', href: '/admin/users' },
    { label: 'Продукти', href: '/admin/products' },
    { label: 'Поръчки', href: '/admin/orders' },
  ];

  return (
    <nav className="sidebar">
      <h2>Admin</h2>
      {menu.map(m => (
        <Link
          key={m.href}
          href={m.href}
          className={path === m.href ? 'active' : ''}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );
}
