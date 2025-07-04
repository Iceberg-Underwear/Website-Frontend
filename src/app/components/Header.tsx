"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Badge,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const [menuAnchor, setMenuAnchor] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart);

  const categories = [
    { name: "Жени", subcategories: ["Бикини", "Сутиени"] },
    { name: "Мъже", subcategories: ["Боксерки", "Потници"] },
  ];

  const handleMenuOpen = (event: any, category: string) => {
    setMenuAnchor({ ...menuAnchor, [category]: event.currentTarget });
  };

  const handleMenuClose = (category: string) => {
    setMenuAnchor({ ...menuAnchor, [category]: null });
  };

  const handleEmptyCart = () => {
    console.log("Очисти количката");
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", color: "#333", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={() => setMobileOpen(true)} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Магазин за бельо "Айсберг"
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {categories.map((category) => (
              <Box key={category.name}>
                <Button
                  onClick={(e) => handleMenuOpen(e, category.name)}
                  sx={{ color: "#333", textTransform: "none", fontSize: "1rem", fontWeight: "500" }}
                >
                  {category.name}
                </Button>
                <Menu
                  anchorEl={menuAnchor[category?.name! as keyof Object] as any}
                  open={Boolean(menuAnchor[category.name as keyof Object])}
                  onClose={() => handleMenuClose(category.name)}
                >
                  {category.subcategories.map((sub) => (
                    <MenuItem key={sub} onClick={() => handleMenuClose(category.name)}>
                      <Link
                        href={`/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {sub}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>

          {/* Search + Cart + Login */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2 }}>
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
              <Link href="/auth" style={{ textDecoration: "none", color: "#fff" }}>Вход</Link>
            </Button>
          </Box>

          {/* Mobile Icons */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1 }}>
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cart.items.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Link href="/auth" style={{ textDecoration: "none", color: "inherit" }}>Вход</Link>
            </IconButton>
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
            cart.items.map((item: any) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
                <img src={item.image} alt={item.name} width={50} />
                <Typography>{item.name}</Typography>
                <Typography>${item.price}</Typography>
                <Button color="error">X</Button>
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

      {/* Mobile Menu Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250 }}>
          {categories.map((category) => (
            <Box key={category.name}>
              <Typography sx={{ fontWeight: "bold", p: 2 }}>{category.name}</Typography>
              {category.subcategories.map((sub) => (
                <MenuItem key={sub} onClick={() => setMobileOpen(false)}>
                  <Link
                    href={`/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {sub}
                  </Link>
                </MenuItem>
              ))}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
