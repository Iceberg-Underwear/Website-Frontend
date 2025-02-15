"use client"

import { useState } from "react";
import { Box, Typography, Select, MenuItem, Button, Grid, IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ReactImageMagnify from "react-image-magnify";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useDispatch } from "react-redux";
import { addToCart, emptyCart } from "../../redux/cartSlice"; 

const product = {
  id: "1",
  name: "Сатенени Къси Панталонки",
  basePrice: 19.90,
  sizes: {
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 1.00,
    "2XL": 1.50,
    "3XL": 2.00,
    "4XL": 2.50,
    "5XL": 3.00,
    "6XL": 4.00,
  },
  colors: ["Старо злато", "Пепел от рози", "Тъмно син", "Черен", "Червен", "Пудра", "Шампан", "Бордо"],
  images: ["/product1.jpg", "/product2.jpg", "/product3.jpg"],
};

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

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const price = product.basePrice + product.sizes[selectedSize];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: price,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        image: mainImage,
      })
    );
  };


  return (
    <>
    <Header/>
    <Box sx={{ padding: "20px", paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '60px' }}>
      <Grid container spacing={4}>
        {/* Left Side - Image Gallery */}
        <Grid item xs={6}>
          <Box sx={{ position: "relative", width: "60%", zIndex: 999 }}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: mainImage,
                },
                largeImage: {
                  src: mainImage,
                  width: 900,
                  height: 900,
                },
              }}
            />
            <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
              <ZoomInIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                width={80}
                height={80}
                onClick={() => setMainImage(img)}
                style={{
                  cursor: "pointer",
                  border: mainImage === img ? "2px solid black" : "none",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Right Side - Product Details */}
        <Grid item xs={6}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h5" sx={{ color: "green", mt: 1 }}>
            В наличност
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {price.toFixed(2)} лв.
          </Typography>

          {/* Size Selection */}
          <Typography sx={{ mt: 2 }}>Размер:</Typography>
          <Select fullWidth value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {Object.keys(product.sizes).map((size) => (
              <MenuItem key={size} value={size}>
                {size} {product.sizes[size] > 0 ? `(+${product.sizes[size]} лв.)` : ""}
              </MenuItem>
            ))}
          </Select>

          {/* Color Selection */}
          <Typography sx={{ mt: 2 }}>Цвят:</Typography>
          <Select fullWidth value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            {product.colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Добави в количката
            </Button>
            <Button variant="outlined" color="secondary">
              Купи сега
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ padding: "20px" }}>
    <Typography variant="h4" sx={{ mb: 6 }}>
          Сходни продукти
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
    <Footer/>
    </>
  );
}
