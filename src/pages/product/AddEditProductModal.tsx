import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Product } from "@/api/types";

interface AddEditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const AddEditProductModal = ({
  open,
  onClose,
  onSave,
  productToEdit,
}: AddEditProductModalProps) => {
  console.log(
    "🚀 ~ file: AddEditProductModal.tsx:25 ~ productToEdit:",
    productToEdit
  );
  const [name, setName] = useState(productToEdit?.name || "");
  const [price, setPrice] = useState(productToEdit?.price || 0);
  const [category, setCategory] = useState(productToEdit?.category || "");
  const [description, setDescription] = useState(
    productToEdit?.description || ""
  );
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    price: "",
    category: "",
  });

  const isEdit = Boolean(productToEdit);

  const handleSave = () => {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors.name = "Product name is required";
    }

    if (!category.trim()) {
      errors.category = "Category is required";
    }

    if (price <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const product: Product = {
      id: isEdit ? productToEdit!.id : undefined,
      name,
      price,
      category,
      description,
    };

    onSave(product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(validationErrors.name)}
          helperText={validationErrors.name || ""}
        />
        <TextField
          margin="dense"
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={Boolean(validationErrors.category)}
          helperText={validationErrors.category || ""}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          error={Boolean(validationErrors.price)}
          helperText={validationErrors.price || ""}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{isEdit ? "Save" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;
