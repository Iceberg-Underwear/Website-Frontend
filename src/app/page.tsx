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
  return (
    <>
      <Header />
      <CarouselBanner />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ mb: 6 }}>
          Нови оферти
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Swiper
            spaceBetween={5}
            slidesPerView={6}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {sampleProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
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
      <Box sx={{ padding: "20px", marginTop: '5vh' }}>
        <Typography variant="h4" sx={{ mb: 6 }}>
          Популярно сред хиперполиглоти гигачадове
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Swiper
            spaceBetween={5}
            slidesPerView={6}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {sampleProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
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
