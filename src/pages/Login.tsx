import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormInput from "@/components/FormInput";
import { AUTH_BASE_URL } from "@/utils/urlApi";
import FlexBetween from "@/components/FlexBetween";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const schema = yup.object().shape({
  username: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { palette } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await axios.post(
        `${AUTH_BASE_URL}/jwt-auth/v1/token`,
        data
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message;
      setServerError(
        errorMessage
          ? errorMessage
          : "An error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <FlexBetween gap="0.75rem" sx={{ color: palette.primary.main }}>
        <BeenhereIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px" color="inherit">
          CodeTest
        </Typography>
      </FlexBetween>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <FormInput
            label="Email"
            type="email"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: errors.password
                        ? palette.error.main
                        : palette.primary.main,
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        {serverError && (
          <div
            style={{ color: "red", marginBottom: 10 }}
            dangerouslySetInnerHTML={{ __html: serverError }}
          />
        )}
        <FlexBetween>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{ marginTop: "0.5rem" }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <Typography color={palette.grey[300]}>
            email : test@ritaro.dev
          </Typography>
          <Typography color={palette.grey[300]}>pass:123</Typography>
        </FlexBetween>
      </form>
    </Container>
  );
};

export default Login;
