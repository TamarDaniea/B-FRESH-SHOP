import axios from "axios";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deledeCart } from "../features/cartSlice";
import { addOrder } from "../api/orderService.js";

import "./EndOrder.css";

const steps = ["פרטי משלוח", "תשלום", "אישור הזמנה"];

export default function EndOrder() {
    const [activeStep, setActiveStep] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const arrCart = useSelector(state => state.cart.arr);
    const sum = useSelector(state => state.cart.sum);
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const navigate = useNavigate();
    const disp = useDispatch();

    const today = new Date().toLocaleDateString();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString();

    const { control, handleSubmit, formState: { errors }, trigger, reset, setValue, watch } = useForm({
        mode: "onTouched",
        defaultValues: { fullName: "", email: "", address: "" }
    });

    useEffect(() => {
        if (user) reset({ fullName: user.userName || "", email: user.email || "", address: user.address || "" });
    }, [user, reset]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeStep]);

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid && activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const onSubmit = async (data) => {
        const orderData = {
            address: data.address,
            userId: user._id,
            products: arrCart.map(product => ({
                product: product,
                count: product.qty
            })),
            price: sum,
            finalPrice: sum,
        };

        try {
            await addOrder(orderData, user?.token);
            console.log("ההזמנה נשמרה בהצלחה");
            setOpenPopup(true);
        } catch (error) {
            console.error("אירעה שגיאה בהגשה:", error);
        }
    };

    return (
        <Box className="end-order-container" >
            <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }} className="end-order-stepper">
                <Stepper activeStep={activeStep} alternativeLabel sx={{ direction: "ltr" }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ mt: 3 }}>
                    {activeStep === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>פרטי משלוח</Typography>
                            <form style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                <TextField
                                    type="text"
                                    name="fullName"
                                    label="Full Name *"
                                    variant="outlined"
                                    value={watch("fullName")}
                                    onChange={(e) => setValue("fullName", e.target.value)}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                    fullWidth
                                />
                                <TextField
                                    type="email"
                                    name="email"
                                    label="Email *"
                                    variant="outlined"
                                    value={watch("email")}
                                    onChange={(e) => setValue("email", e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    name="address"
                                    label="Shipping Address *"
                                    variant="outlined"
                                    value={watch("address")}
                                    onChange={(e) => setValue("address", e.target.value)}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    fullWidth
                                />
                            </form>
                            <Box className="end-order-buttons">
                                <Button variant="contained" onClick={handleNext}>המשך</Button>
                            </Box>
                        </Box>
                    )}
                    {activeStep===1 &&(
                        <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>פרטי תשלום</Typography>
                        <form style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                            <TextField
                                type="text"
                                name="cardNumber"
                                label="מספר כרטיס אשראי *"
                                variant="outlined"
                                value={watch("cardNumber")}
                                onChange={(e) => setValue("cardNumber", e.target.value)}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber?.message}
                                fullWidth
                            />
                            <TextField
                                type="text"
                                name="expiry"
                                label="תוקף (MM/YY) *"
                                variant="outlined"
                                value={watch("expiry")}
                                onChange={(e) => setValue("expiry", e.target.value)}
                                error={!!errors.expiry}
                                helperText={errors.expiry?.message}
                                fullWidth
                            />
                            <TextField
                                type="text"
                                name="cvv"
                                label="CVV (שלוש ספרות) *"
                                variant="outlined"
                                value={watch("cvv")}
                                onChange={(e) => setValue("cvv", e.target.value)}
                                error={!!errors.cvv}
                                helperText={errors.cvv?.message}
                                fullWidth
                            />
                            <TextField
                                type="text"
                                name="idNumber"
                                label="תעודת זהות *"
                                variant="outlined"
                                value={watch("idNumber")}
                                onChange={(e) => setValue("idNumber", e.target.value)}
                                error={!!errors.idNumber}
                                helperText={errors.idNumber?.message}
                                fullWidth
                            />
                        </form>
                        <Box className="end-order-buttons">
                            <Button onClick={handleBack}>חזור</Button>
                            <Button variant="contained" onClick={handleNext}>המשך</Button>
                        </Box>
                    </Box>
                    )}

                    {activeStep === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>אישור הזמנה</Typography>
                            {arrCart.map(order => (
                                <Box key={order._id} className="order-item">
                                    <Box style={{ position: "relative" }}>
                                        <span className="order-qty">{order.qty}</span>
                                        <img
                                            src={order.img}
                                            onError={(e) => e.currentTarget.src = `${order.img}`}
                                            alt={order.name}
                                        />
                                    </Box>
                                    <Typography className="order-name">{order.name}</Typography>
                                    <Typography className="order-price">₪{order.price} </Typography>
                                </Box>
                            ))}
                            <Typography className="total-price" sx={{ fontWeight: "bold", mt: 2, fontSize: "25px" }}>סה"כ לתשלום: ₪{sum} </Typography>
                            <Box className="end-order-buttons">
                                <Button onClick={handleBack}>חזור</Button>
                                <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>סיום</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
                <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                    <DialogTitle>ההזמנה נקלטה בהצלחה</DialogTitle>
                    <DialogContent>
                        <Typography><strong>מספר הזמנה:</strong> {orderNumber}</Typography>
                        <Typography><strong>תאריך הזמנה:</strong> {today}</Typography>
                        <Typography><strong>תאריך הגעה:</strong> {formattedDeliveryDate}</Typography>
                        <Typography><strong>כתובת:</strong> {watch("address")}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { disp(deledeCart()); navigate("/home"); }}>לדף הבית</Button>
                        <Button onClick={() => { disp(deledeCart()); navigate("/MyOrder"); }}>צפייה בהזמנה</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
