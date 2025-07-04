import React from "react";
import { Box } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          border: "6px solid #e0e0e0",
          borderTop: "6px solid #1976d2",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}
