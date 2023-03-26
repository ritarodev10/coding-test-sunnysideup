import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "@/api/types";

interface AddEditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

interface FormValues {
  name: string;
  price: number;
  category: string;
  description: string;
}

const schema = yup.object().shape({
  name: yup.string().trim().required("Product name is required"),
  price: yup.number().positive("Price must be greater than 0").required(),
  category: yup.string().trim().required("Category is required"),
  description: yup.string().trim(),
});

const AddEditProductModal = ({
  open,
  onClose,
  onSave,
  productToEdit,
}: AddEditProductModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
    },
  });

  const isEdit = Boolean(productToEdit);

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    } else {
      reset({
        name: "",
        category: "",
        price: 0,
        description: "",
      });
    }
  }, [productToEdit]);

  const handleSave: SubmitHandler<FormValues> = (data) => {
    onSave({
      id: isEdit ? productToEdit!.id : "",
      ...data,
    });
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
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message || ""}
        />
        <TextField
          margin="dense"
          label="Category"
          fullWidth
          {...register("category")}
          error={Boolean(errors.category)}
          helperText={errors.category?.message || ""}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          type="number"
          {...register("price")}
          error={Boolean(errors.price)}
          helperText={errors.price?.message || ""}
        />
        {isEdit && (
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleSave)}>
          {isEdit ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProductModal;
