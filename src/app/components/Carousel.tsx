"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";

const images = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
];

export default function CarouselBanner() {
  return (
    <Box sx={{ width: "100%", height: "400px", overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`Banner ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
