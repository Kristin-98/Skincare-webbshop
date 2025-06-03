"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 400, lg: 700 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@media (max-width: 1280px)": {
          height: 600,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          animation: "zoomIn 4s ease-out forwards",
          "@keyframes zoomIn": {
            "0%": { transform: "scale(1)" },
            "100%": { transform: "scale(1.1)" },
          },
          "& img": {
            objectFit: "cover",
            objectPosition: "center 80%",
          },
        }}
      >
        <Image
          src="/hero.png"
          alt="Hero Image"
          layout="fill"
          quality={90}
          priority
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 800,
          padding: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 30, md: 40 },
            fontWeight: "400",
            textShadow: "2px 2px 4px rgba(50, 50, 50, 0.6)",
            mb: 2,
          }}
        >
          Discover timeless Scandinavian design — minimal, functional, and
          crafted to elevate every space.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "400",
          }}
        >
          Each piece in our collection reflects the harmony of form and function
          — curated with natural materials, soft tones, and enduring
          craftsmanship to bring calm and clarity into your home.
        </Typography>

        <Link href="/category" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              backgroundColor: "#ffffff",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Shop by Category
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
