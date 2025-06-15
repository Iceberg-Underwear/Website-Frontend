'use client';
import './ProductCards.css';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string; altText: string }[];
};

export default function ProductCards({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products?.map(p => (
        <div className="product-card" key={p.id}>
          <img src={p.images[0]?.url} alt={p.images[0]?.altText} />
          <h3>{p.name}</h3>
          <p className="price">${p.price.toFixed(2)}</p>
          <div className="actions">
            <button>Редактирай</button>
            <button className="delete">Изтрий</button>
          </div>
        </div>
      ))}
    </div>
  );
}
