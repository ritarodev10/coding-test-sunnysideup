import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useGetProductsQuery, useDeleteProductMutation } from "@/api/apiSlice";
import AddEditProductModal from "@/pages/product/AddEditProductModal";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: products = [], refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = () => setIsAddProductDialogOpen(true);
  const handleEditProduct = (product) => setSelectedProduct(product);
  const handleCloseAddProductDialog = () => {
    setSelectedProduct(null);
    setIsAddProductDialogOpen(false);
    refetch();
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  const handleAddEditProduct = (product) => {
    // TODO: implement add/edit product
    handleCloseAddProductDialog();
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
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </Grid>
        ))}
      </Grid>
      {/* Add/Edit Product Dialog */}
      <AddEditProductModal
        open={isAddProductDialogOpen}
        onClose={handleCloseAddProductDialog}
        selectedProduct={selectedProduct}
        onSave={handleAddEditProduct}
      />
      {/* Button to Trigger Modal */}
      <Button variant="contained" onClick={handleAddProduct}>
        Add Product
      </Button>
    </Box>
  );
};

export default ProductPage;
