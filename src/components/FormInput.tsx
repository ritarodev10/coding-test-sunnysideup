import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.main,
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default FormInput;
