"use client";

import { AppBar, Toolbar, Typography, Box, IconButton, Badge, InputBase, Menu, MenuItem, Button, Drawer } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { removeFromCart } from "../redux/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { emptyCart } from "../redux/cartSlice";

const categories = [
  { name: "Мъжко", subcategories: ["T-Shirts", "Underwear", "Accessories"] },
  { name: "Женско", subcategories: ["Lingerie", "Dresses", "Accessories"] },
  { name: "Детско", subcategories: ["Clothing", "Toys", "Shoes"] },
  { name: "Бански", subcategories: ["Men’s", "Women’s", "Kids"] },
];

export default function Header() {
  const [menuAnchor, setMenuAnchor] = useState<{ [key: string]: HTMLElement | null }>({});

  const cart = useSelector((state : any) => state.cart);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, category: string) => {
    setMenuAnchor({ ...menuAnchor, [category]: event.currentTarget });
  };

  const handleMenuClose = (category: string) => {
    setMenuAnchor({ ...menuAnchor, [category]: null });
  };

  const handleEmptyCart = () => {
    dispatch(
      emptyCart()
    )
  }
  return (
    <>
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>Магазин за белйо "Айсберг"</Link>
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {categories.map((category) => (
            <Box key={category.name}>
              <Button
                onClick={(event) => handleMenuOpen(event, category.name)}
                sx={{ color: "#333", textTransform: "none", fontSize: "1rem", fontWeight: "500" }}
              >
                {category.name}
              </Button>
              <Menu
                anchorEl={menuAnchor[category.name]}
                open={Boolean(menuAnchor[category.name])}
                onClose={() => handleMenuClose(category.name)}
              >
                {category.subcategories.map((sub) => (
                  <MenuItem key={sub} onClick={() => handleMenuClose(category.name)}>
                    <Link href={`/${category.name.toLowerCase()}/${sub.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {sub}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>

        {/* Search & Cart */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: "5px", padding: "5px 10px" }}>
            <SearchIcon />
            <InputBase placeholder="Търси продукти..." sx={{ ml: 1 }} />
          </Box>

          <IconButton size="large" color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cart.items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button variant="contained" color="primary">
            <Link href="/auth/login" style={{ textDecoration: "none", color: "#fff" }}>Вход</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    {/* Cart Popup */}
    <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Количка</Typography>
          {cart.items.length === 0 ? (
            <Typography>Вашата количка е празна</Typography>
          ) : (
            cart.items.map((item : any) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
                <img src={item.image} alt={item.name} width={50} />
                <Typography>{item.name}</Typography>
                <Typography>${item.price}</Typography>
                <Button color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                  X
                </Button>
              </Box>
            ))
          )}
          {cart.items.length > 0 && (
            <>
              <Button fullWidth variant="contained" color="secondary" onClick={handleEmptyCart}>
                Изчисти количката
              </Button>
              <Button fullWidth variant="contained" color="primary" href="/checkout">
                Продължи към плащане
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
