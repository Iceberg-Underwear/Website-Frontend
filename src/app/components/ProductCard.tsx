"use client";

import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Product } from "../page";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, description, price, images }: Product) {
  return (
    <Card sx={{ maxWidth: 300, m: 2, width: {xs: "60vw"} }}>
      <CardMedia component="img" height="200" image={images?.at(0)?.url} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">${price.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          <Link href={`/product/${id}`} style={{ textDecoration: "none", color: "#fff" }}>Разгледай</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
