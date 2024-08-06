import { Container, Typography } from "@mui/material";
import { getProducts } from "@/lib/actions/products";
import ProductTable from "@/components/product-table";

async function MainPage() {
  const products = await getProducts();

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Products
      </Typography>
      <ProductTable products={products} />
    </Container>
  );
}

export default MainPage;
