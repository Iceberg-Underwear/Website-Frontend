"use client"

import { useEffect, useState } from "react";
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
import { Product } from "@/app/page";
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from "@/app/components/Loading";

const product1 = {
  id: "1",
  name: "Сатенени Къси Панталонки",
  basePrice: 19.90,
  sizes: {
    "XS": 0,
    "S": 0,
    "M": 0,
    "L": 0,
    "XL": 1.00,
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

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const idObj = useParams();

  const [selectedSize, setSelectedSize] = useState(currentProduct ? currentProduct.sizes.split(",")[0] : null);
  const [selectedColor, setSelectedColor] = useState(currentProduct ? currentProduct.colors.split(",")[0] : null);
  const [mainImage, setMainImage] = useState(currentProduct ? currentProduct.images![0].url : null);

  useEffect(() => {
    fetch(`https://website-backend-e2kt.onrender.com/product/${idObj.id}`, {
      method: "GET"
    }).then((response) => response.json())
    .then((data) => {
      setCurrentProduct(data)
      setSelectedSize(data?.sizes?.split(",")[0])
      setSelectedColor(data?.colors.split(",")[0]);
      setMainImage(data?.images![0].url)
      console.log(data?.sizes.split(",").at(0));
    }
    ).catch(error => {
      console.log(error);
    }); 
  }, []);



  useEffect(() => {
    console.log("");
  }, [currentProduct, selectedColor, selectedSize])


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

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: idObj.id?.toString()!,
        name: currentProduct?.name!,
        price: currentProduct?.price!,
        size: selectedSize!,
        color: selectedColor!,
        quantity: 1,
        image: mainImage!,
      })
    );
  };

  if (!currentProduct) {
    return <LoadingSpinner/>
  }

  return (
    <>
      <Header />
  
      {/* Main Product Section */}
      <Box sx={{ px: { xs: 2, sm: 4, md: '7vw' }, pt: '60px', pb: 4 }}>
        <Grid container spacing={4}>
          {/* Left Side - Image Gallery */}
          <Grid item xs={12} md={6}>
            <Box sx={{ width: { xs: '100%', sm: '80%', m: '60%' }, mx: { xs: 'auto', md: 0 }, position: 'relative' }}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: currentProduct?.name,
                    isFluidWidth: true,
                    src: mainImage || currentProduct?.images?.[0]?.url!,
                  },
                  largeImage: {
                    src: mainImage || currentProduct?.images?.[0]?.url!,
                    width: 900,
                    height: 900,
                  },
                }}
              />
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <ZoomInIcon />
              </IconButton>
            </Box>
  
            {/* Thumbnail Gallery */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, mt: 2 }}>
              {currentProduct?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.altText}
                  width={70}
                  height={70}
                  onClick={() => setMainImage(img.url)}
                  style={{
                    cursor: "pointer",
                    border: mainImage === img.url ? "2px solid black" : "1px solid #ccc",
                    borderRadius: 4,
                  }}
                />
              ))}
            </Box>
          </Grid>
  
          {/* Right Side - Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{currentProduct?.name}</Typography>
  
            <Typography variant="h6" sx={{ color: "green", mt: 1 }}>
              В наличност
            </Typography>
  
            <Typography variant="h5" sx={{ mt: 2 }}>
              {currentProduct?.price.toFixed(2)} лв.
            </Typography>
  
            {/* Size Selection */}
            <Typography sx={{ mt: 3 }}>Размер:</Typography>
            <Select
              fullWidth
              value={selectedSize || currentProduct?.sizes.split(",")[0]}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {currentProduct?.sizes.split(",").map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
  
            {/* Color Selection */}
            <Typography sx={{ mt: 3 }}>Цвят:</Typography>
            <Select
              fullWidth
              value={selectedColor || currentProduct?.colors.split(",")[0]}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {currentProduct?.colors.split(",").map((color) => (
                <MenuItem key={color} value={color}>{color}</MenuItem>
              ))}
            </Select>
  
            {/* Buttons */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleAddToCart} fullWidth>
                Добави в количката
              </Button>
              <Button variant="outlined" color="secondary" fullWidth>
                Купи сега
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
  
      {/* Related Products */}
      <Box sx={{ px: { xs: 2, sm: 4, md: '7vw' }, pb: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: { xs: "center", md: "left" } }}>
          Сходни продукти
        </Typography>
  
        <Box sx={{ position: "relative" }}>
          <Swiper
            spaceBetween={10}
            navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              900: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
              1536: { slidesPerView: 6 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product?.id}>
                <ProductCard {...product!} />
              </SwiperSlide>
            ))}
          </Swiper>
  
          {/* Swiper navigation arrows */}
          <IconButton className="prev-btn" sx={{ position: "absolute", top: "50%", left: 0, zIndex: 90, transform: "translateY(-50%)" }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className="next-btn" sx={{ position: "absolute", top: "50%", right: 0, zIndex: 90, transform: "translateY(-50%)" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
  
      <Footer />
    </>
  );
}  