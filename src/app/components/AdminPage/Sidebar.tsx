'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

export default function Sidebar() {
  const path = usePathname();
  const menu = [
    { label: 'Потребители', href: '/admin/users', icon: '👤' },
    { label: 'Продукти', href: '/admin/products', icon: '📦' },
    { label: 'Поръчки', href: '/admin/orders', icon: '🛒' },
  ];

  return (
    <nav className="sidebar">
      <h2>Контролен панел</h2>
      {menu.map(m => (
        <Link
          key={m.href}
          href={m.href}
          className={path === m.href ? 'active' : ''}
          aria-label={m.label} // accessibility: label for icon-only links
        >
          <span className="icon">{m.icon}</span>
          <span className="label">{m.label}</span>
        </Link>
      ))}
    </nav>
  );
}
