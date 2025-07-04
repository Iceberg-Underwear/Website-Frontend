"use client";

import Sidebar from '@/app/components/AdminPage/Sidebar';
import ProductCards from '@/app/components/AdminPage/ProductCards';
import { RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/app/components/Header';
import AddProductForm from '@/app/components/AdminPage/AddProductForm';
import "./page.css";
import EditProductForm from '@/app/components/AdminPage/EditProductForm';

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

  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(true);
  const [currentEditProduct, setCurrentEditProduct] = useState<import("@/app/page").Product>();

  function setEditMode() {
    setIsAddingProduct(false);
  }

  function setAddMode() {
    setIsAddingProduct(true);
  }

  function setProductForEdit(product: import("@/app/page").Product) {
    setCurrentEditProduct(product);
  }

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
        <h1>Артикули</h1>
        {
          isAddingProduct ?
          <AddProductForm onProductAdded={() => window.location.reload()}/>
          : <EditProductForm onProductAdded={() => window.location.reload()} onCancel={setAddMode} productData={currentEditProduct!}/>
        }
        <ProductCards products={products!} onEdit={setEditMode} setEditProduct={setProductForEdit}/> 
      </main>
    </div>
  );
}
