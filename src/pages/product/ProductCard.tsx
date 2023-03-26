import {
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteProductMutation } from "@/api/apiSlice";
import ItemCard from "@/components/ItemCard";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    image_url: string;
  };
  onEdit: (product: any) => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const { palette } = useTheme();
  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = () => deleteProduct({ id: product.id });

  return (
    <ItemCard
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: palette.grey[300],
      }}
    >
      <CardHeader
        title={product.name}
        subheader={`${product.currency}${product.price}`}
        titleTypographyProps={{
          color: palette.secondary.main,
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        subheaderTypographyProps={{
          color: palette.secondary[100],
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="inherit">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{ color: palette.grey[700] }}
          aria-label="edit"
          onClick={() => onEdit(product)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ color: palette.grey[700] }}
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </ItemCard>
  );
};

export default ProductCard;
