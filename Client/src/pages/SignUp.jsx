import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/userService";
import { TextField, Button, Box, Typography, Paper, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();
    const [signupError, setSignupError] = useState("");
    const password = watch("password");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        addUser(data)
            .then(() => {
                alert("משתמש נוסף בהצלחה");
                navigate("/LogIn");
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || "שגיאה בהוספת המשתמש";
                setSignupError(errorMessage);
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
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: 400,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: "#66b3ff", fontWeight: "bold" }}>
                  הרשמה
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="שם משתמש"
                            variant="outlined"
                            {...register("userName", { 
                                required: "יש להזין שם משתמש", 
                                minLength: { value: 3, message: "שם המשתמש חייב להכיל לפחות 3 תווים" }, 
                                maxLength: { value: 30, message: "שם המשתמש לא יכול להיות ארוך מ-30 תווים" } 
                            })}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="אימייל"
                            type="email"
                            variant="outlined"
                            {...register("email", {
                                required: "יש להזין אימייל",
                                pattern: {
                                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                    message: "אימייל לא תקין"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
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
                                minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
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
                                )
                            }}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            label="אימות סיסמה"
                            variant="outlined"
                            {...register("confirmPassword", {
                                required: "יש לאמת את הסיסמה",
                                validate: (value) => value === password || "הסיסמאות אינן תואמות"
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    {signupError && (
                        <Typography color="error" variant="body2" gutterBottom>
                            {signupError}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#66b3ff", color: "white", fontWeight: "bold", mt: 2, "&:hover": { backgroundColor: "#3399ff" }, width: "100%" }}>
                        הרשמה
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        כבר רשומים? {" "}
                        <Link href="/LogIn" underline="hover" sx={{ color: "#66b3ff", "&:hover": { color: "black" } }}>
                            התחברו כאן
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default SignUp;
