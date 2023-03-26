import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/api/apiSlice";
import AddEditProductModal from "@/pages/product/AddEditProductModal";
import ProductCard from "./ProductCard";
import { Product } from "@/api/types";

const ProductPage = () => {
  const [isAddEditProductModalOpen, setIsAddEditProductModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], refetch } = useGetProductsQuery();

  const handleAddProductModal = () => setIsAddEditProductModalOpen(true);
  const handleCloseAddEditProductModal = () => {
    setSelectedProduct(null);
    setIsAddEditProductModalOpen(false);
    refetch();
  };

  const [addproduct] = useAddProductMutation();
  const [editProduct] = useUpdateProductMutation();

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct, ...product };
      editProduct(updatedProduct);
    } else {
      addproduct(product as Omit<Product, "id">);
    }
    handleCloseAddEditProductModal();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleAddProductModal}>
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
        onSave={handleSaveProduct}
      />
    </Box>
  );
};

export default ProductPage;
