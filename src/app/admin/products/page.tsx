"use client";

import Sidebar from '@/app/components/AdminPage/Sidebar';
import ProductCards from '@/app/components/AdminPage/ProductCards';
import { RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/app/components/Header';
import AddProductForm from '@/app/components/AdminPage/AddProductForm';
import "./page.css";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: { url: string; altText: string }[];
};

export default function ProductsPage() {
 const [products, setProducts] = useState<Array<Product> | null>(null);
  const auth_token = useSelector((state: RootState) => state.auth.access_token);

  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);

  useEffect(() => { 
    async function getProducts() {
        const access_token = localStorage.getItem("auth_token");
        await fetch("https://website-backend-e2kt.onrender.com/product", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        }).then((response: Response) => response.json())
        .then(data => {
            setProducts(data);
        })
    }

    getProducts();
  }, []);
  
  return (
    <div className="admin-page">
      <Header />
      <Sidebar />
      <main className='content'>
        <h1>Products</h1>
        <AddProductForm onProductAdded={() => window.location.reload()}/>
        <ProductCards products={products!} /> 
      </main>
    </div>
  );
}
