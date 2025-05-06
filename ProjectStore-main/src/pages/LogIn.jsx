import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    login(data.userName, data.password)
      .then((res) => {
        dispatch(userIn(res.data));
        navigate("/home");
      })
      .catch(() => {
        setLoginError("שם משתמש או סיסמה שגויים, נסה שוב.");
        reset();
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("/images/ll.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}>
          התחברות
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="שם משתמש"
              variant="outlined"
              {...register("userName", { required: "יש להזין שם משתמש" })}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="סיסמה"
              variant="outlined"
              {...register("password", {
                required: "יש להזין סיסמה",
                minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {loginError && (
            <Typography color="error" variant="body2" gutterBottom>
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#66b3ff",
              color: "white",
              fontWeight: "bold",
              mt: 2,
              "&:hover": { backgroundColor: "#3399ff" },
              width: "100%",
            }}
          >
            התחבר
          </Button>

          <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
            עדיין לא נרשמתם?{" "}
            <Link
              href="/SignUp"
              underline="hover"
              sx={{
                color: "#66b3ff",
                "&:hover": { color: "#fff" },
              }}
            >
              הירשמו כאן
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default LogIn;