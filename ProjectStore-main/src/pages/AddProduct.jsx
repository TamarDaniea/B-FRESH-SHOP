import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productServer";
import { useSelector } from "react-redux";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Grid
} from "@mui/material";

const categories = ["BRULEE", "TEA", "B-CREAM CAFÉ", "B-FREEZE"];
const ingredientsList = ["חלב", "וניל", "כדורי טפיוקה", "קרם בורלה", "קצפת", "שוקולד מריר", "לוטוס"];

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            ingredient: Array.isArray(data.ingredient) ? data.ingredient : [data.ingredient]
        };
        console.log("Data being sent:", formattedData);

        addProduct(formattedData, user?.token)
            .then(() => {
                alert("מוצר נוסף בהצלחה!");
                navigate("/home");
                reset();
            })
            .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message || "שגיאה בהוספת המוצר");
            });
    };

    return (
        <Box
            sx={{
                maxWidth: "600px",
                margin: "auto",
                padding: "20px",
                boxShadow: 3,
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" sx={{ mb: 3, color: "#66b3ff", fontWeight: "bold" }}>
                הוספת מוצר חדש
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                {/* שדות Grid - צד שמאל וימין */}
                <Grid container spacing={2}>
                    {/* צד שמאל */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="שם המוצר"
                            {...register("name", { required: "חובה להזין שם מוצר" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                            sx={{ mb: 2 }}  // רווח בין השדות
                        />
                        <TextField
                            label="מחיר"
                            type="number"
                            {...register("price", { required: "חובה להזין מחיר" })}
                            error={!!errors.price}
                            fullWidth
                            sx={{ mb: 2 }}  // רווח בין השדות
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>קטגוריה</InputLabel>
                            <Select
                                {...register("category", { required: "חובה לבחור קטגוריה" })}
                                defaultValue=""
                                error={!!errors.category}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && <Typography color="error" sx={{ mt: 1 }}>{errors.category.message}</Typography>}
                        </FormControl>
                    </Grid>

                    {/* צד ימין */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="תיאור המוצר"
                            multiline
                            rows={3}
                            {...register("description")}
                            fullWidth
                            sx={{ mb: 2 }}  // רווח בין השדות
                        />
                        <TextField
                            label="קישור לתמונה"
                            {...register("img")}
                            fullWidth
                            sx={{ mb: 2 }}  // רווח בין השדות
                        />
                        <TextField
                            label="תאריך"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            {...register("date")}
                            defaultValue={new Date().toISOString().split("T")[0]}
                            fullWidth
                            sx={{ mb: 2 }}  // רווח בין השדות
                        />
                    </Grid>
                </Grid>

                {/* בחירת מרכיבים */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>מרכיבים</InputLabel>
                    <Select
                        multiple
                        value={Array.isArray(watch("ingredient")) ? watch("ingredient") : []}
                        onChange={(e) => setValue("ingredient", e.target.value)}
                    >
                        {ingredientsList.map((ing) => (
                            <MenuItem key={ing} value={ing}>
                                {ing}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* כפתור שליחה */}
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: "#66b3ff",
                        color: "#fff",
                        fontWeight: "bold",
                        mt: 2,
                        "&:hover": { backgroundColor: "#3399ff" },
                        maxWidth: "80%",
                        margin: "0 auto"
                    }}
                >
                    הוסף מוצר
                </Button>
            </form>
        </Box>
    );
};

export default AddProduct;
