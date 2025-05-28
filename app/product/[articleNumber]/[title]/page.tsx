import BuyButton from "@/app/components/buy-button";
import { db } from "@/prisma/db";
import { Box, CardMedia, Divider, Typography } from "@mui/material";

interface Props {
  params: Promise<{ articleNumber: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { articleNumber } = await params;
  const item = await db.product.findUnique({ where: { articleNumber } });

  if (!item) return <h2>404: Product not found</h2>;

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: { xs: "100%", sm: "90%", md: "80%" },
          margin: "0 auto",
          mb: 6,
          mt: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: "auto",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: "auto",
              objectFit: "contain",
            }}
            image={item.image}
            alt={item.title}
          />

          <Box
            sx={{
              gap: 4,
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "50%" },
              px: { xs: 3, sm: 0 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2rem",
                  md: "2.5rem",
                },
              }}
            >
              {item.title}
            </Typography>
            <Typography>
              <strong>Art number:</strong> {item.articleNumber}
            </Typography>
            <Divider />
            <Typography>{item.description}</Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginRight: "10px",
              }}
            >
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                <strong>Price:</strong> {item.price} kr
              </Typography>
              <BuyButton product={item} />
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
