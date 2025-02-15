"use client";

import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Checkout() {
  const cart = useSelector((state : any) => state.cart);
  //const router = useRouter();

  if (cart.length === 0) {
    return <Typography>Вашата количка е празна!</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">Потвърждение на поръчката</Typography>
      <Box>
        {cart.items.map((item : any) => (
          <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <img src={item.image} alt={item.name} width={50} />
            <Typography>{item.name}</Typography>
            <Typography>${item.price}</Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Обща сума: ${cart.items.reduce((acc : any, item : any) => acc + item.price, 0).toFixed(2)}
      </Typography>

      <Button fullWidth variant="contained" color="success" sx={{ marginTop: 2 }} /*onClick={() => router.push("/payment")}*/ >
        Продължи към плащане
      </Button>
    </Box>
  );
}
