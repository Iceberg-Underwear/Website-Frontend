"use client"

import Header from "./components/Header";
import CarouselBanner from "./components/Carousel";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/Loading";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string;
  colors: string;
  images?: { url: string; altText: string }[];
  tags?: string;
}

const sampleProducts = [
  { id: 1, name: "Скибиди", price: 29.99, image: "/product1.jpg" },
  { id: 2, name: "Полиглот гигачад", price: 39.99, image: "/product2.jpg" },
  { id: 3, name: "Ohajo", price: 29.99, image: "/product1.jpg" },
  { id: 4, name: "Rizzler", price: 39.99, image: "/product2.jpg" },
  { id: 5, name: "Скибиди toilet", price: 29.99, image: "/product1.jpg" },
  { id: 6, name: "Sigma male", price: 39.99, image: "/product2.jpg" },
  { id: 7, name: "Скибиди", price: 29.99, image: "/product1.jpg" },
  { id: 8, name: "Полиглот гигачад", price: 39.99, image: "/product2.jpg" },
  { id: 9, name: "Ohajo", price: 29.99, image: "/product1.jpg" },
  { id: 10, name: "Rizzler", price: 39.99, image: "/product2.jpg" },
  { id: 11, name: "Скибиди toilet", price: 29.99, image: "/product1.jpg" },
  { id: 12, name: "Sigma male", price: 39.99, image: "/product2.jpg" },
];

export default function HomePage() {

  const [products, setProducts] = useState<Array<Product | null>>([]);

  useEffect(() => {
    fetch("https://website-backend-e2kt.onrender.com/product", {
      method: "GET"
    }).then((response: Response) => response.json())
    .then((data: Array<Product>) =>
      setProducts(data)
    ).catch(error => {
      console.log(error);
    });

  }, []);

  if(products.length === 0) return <LoadingSpinner />

  return (
    <>
      <Header />
      <CarouselBanner />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ mb: 6 }}>
          Нови оферти
        </Typography>
        <Box sx={{ position: "relative", px: 2 }}>
      {/* Navigation buttons */}
      <Box className="prev-btn" sx={{ position: "absolute", top: "40%", left: 0, zIndex: 2, cursor: "pointer" }}>‹</Box>
      <Box className="next-btn" sx={{ position: "absolute", top: "40%", right: 0, zIndex: 2, cursor: "pointer" }}>›</Box>

      <Swiper
        spaceBetween={10}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product?.id}>
            <ProductCard {...product!} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
        
      </Box>
      <Box sx={{ padding: "20px", marginTop: '5vh' }}>
        <Typography variant="h4" sx={{ mb: 6 }}>
          Популярно сред хиперполиглоти гигачадове
        </Typography>
        <Box sx={{ position: "relative" }}>
        <Swiper
        spaceBetween={10}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
      >
            {products.map((product) => (
              <SwiperSlide key={product?.id}>
                <ProductCard {...product!} />
              </SwiperSlide>
            ))}
          </Swiper>
          <IconButton className="prev-btn" sx={{ position: "absolute", left: 0, top: "50%", zIndex: 90 }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className="next-btn" sx={{ position: "absolute", right: 0, top: "50%", zIndex: 90 }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        
      </Box>
      <Footer />
    </>
  );
}
