import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useGetProductsQuery } from "@/api/apiSlice";
import AddEditProductModal from "@/pages/product/AddEditProductModal";
import ProductCard from "./ProductCard";
import { Product } from "@/api/types";

const ProductPage = () => {
  const [isAddEditProductModalOpen, setIsAddEditProductModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products = [], refetch } = useGetProductsQuery();

  const handleAddProduct = () => setIsAddEditProductModalOpen(true);
  const handleEditProduct = (product: Product) => setSelectedProduct(product);
  const handleCloseAddEditProductModal = () => {
    setSelectedProduct(null);
    setIsAddEditProductModalOpen(false);
    refetch();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Box>
        </Grid>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <ProductCard
              product={product}
              setIsAddEditProductModalOpen={setIsAddEditProductModalOpen}
              setSelectedProduct={setSelectedProduct}
            />
          </Grid>
        ))}
      </Grid>
      {/* Add/Edit Product Dialog */}
      <AddEditProductModal
        open={isAddEditProductModalOpen}
        onClose={handleCloseAddEditProductModal}
        productToEdit={selectedProduct}
      />
    </Box>
  );
};

export default ProductPage;
