'use client';

import React, { useEffect, useState } from 'react';
import './AddProductForm.css';
import { Product } from '@/app/page';

export default function EditProductForm({ onProductAdded, onCancel, productData }: { onProductAdded: () => void, onCancel: CallableFunction, productData: Product }) {
  const [formVisible, setFormVisible] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [tags, setTags] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [altText, setAltText] = useState('');

  const toggleForm = () => setFormVisible(!formVisible);

  useEffect(() => {
    setName(productData.name);
    setPrice(productData.price);
    setDescription(productData.description);
    setSizes(productData.sizes);
    setColors(productData.colors);
    setTags(productData.tags!);

  }, [formVisible, productData])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const access_token = localStorage.getItem("auth_token");

    // First upload image
    const uploadedImages = [];

    for (const file of imageFiles) {
      const imageData = new FormData();
      imageData.append("image", file);
      imageData.append("altText", altText);

      const imageResponse = await fetch("https://website-backend-e2kt.onrender.com/image", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        body: imageData
      });

      const uploadedImage = await imageResponse.json();
      uploadedImages.push({ url: uploadedImage.imageUrl, altText });
    }

    const productPayload = {
      id: productData.id,
      name,
      price: price,
      description,
      sizes,
      colors,
      images: uploadedImages,
      tags
    };

    const res = await fetch("https://website-backend-e2kt.onrender.com/product", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(productPayload)
    });

    if (res.ok) {
      alert("Product added successfully!");
      setFormVisible(false);
      onProductAdded();
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-container">
      {formVisible ?? <button className="toggle-btn" onClick={() => {toggleForm(); onCancel();}}>
        Отказ от редактиране
      </button> }
      {formVisible && (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="product-form-left">
            <h2>Добави нова стока</h2>
            <input
                type="text"
                placeholder="Име на стоката"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Размери,отделени,със,запетаи"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
            />
            <input
                type="text"
                placeholder="Цветове,отделени,със,запетая"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
            />
            </div>
            <div className="product-form-right">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
              required
            />
            <input
                type="text"
                placeholder="Алтернативен текст"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
            />
            <input
                type="text"
                placeholder="Тагове,отделени,със,запетаи"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit" className="submit-btn">Добавяне</button>
            </div>
        </form>
        )}
    </div>
  );
}