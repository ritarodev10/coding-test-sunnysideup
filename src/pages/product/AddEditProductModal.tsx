import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
// import {
//   useAddProductMutation,
//   useUpdateProductMutation,
// } from "@/api/apiSlice";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
});

interface AddEditProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
}

const AddEditProductModal = ({
  open,
  onClose,
  product,
}: AddEditProductModalProps) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    price?: string;
    category?: string;
  }>({});
  // const [addProduct] = useAddProductMutation();
  // const [updateProduct] = useUpdateProductMutation();
  const isEdit = !!product;

  // const validateFields = async () => {
  //   try {
  //     const dataToValidate = { name, price, category };
  //     await validationSchema.validate(dataToValidate, { abortEarly: false });
  //     setValidationErrors({});
  //     return true;
  //   } catch (err) {
  //     const errors: { [key: string]: string } = {};
  //     err.inner.forEach((validationError) => {
  //       errors[validationError.path as string] = validationError.message;
  //     });
  //     setValidationErrors(errors);
  //     return false;
  //   }
  // };

  const handleSubmit = async () => {
    const isValid = await validateFields();
    if (isValid) {
      const newProduct = {
        id: product?.id || "",
        name,
        description: "Description",
        price,
        currency: "USD",
        category,
        image_url: "https://via.placeholder.com/150",
      };

      // try {
      //   if (isEdit) {
      //     await updateProduct(newProduct);
      //   } else {
      //     await addProduct(newProduct);
      //   }
      //   onClose();
      // } catch (err) {
      //   console.error(err);
      // }
    }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? "Save" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;
