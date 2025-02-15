import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#222", color: "#fff", padding: "20px", textAlign: "center", mt: 5 }}>
      <Typography variant="body1">© 2025 Магазин за белйо "Айсберг"</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}>
        <Link href="/about" sx={{ color: "#ccc", textDecoration: "none" }}>За нас</Link>
        <Link href="/contact" sx={{ color: "#ccc", textDecoration: "none" }}>Контакт</Link>
        <Link href="/terms" sx={{ color: "#ccc", textDecoration: "none" }}>Условия</Link>
      </Box>
    </Box>
  );
}
