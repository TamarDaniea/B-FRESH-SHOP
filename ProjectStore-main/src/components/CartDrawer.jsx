import { Drawer, List, ListItem, ListItemText, IconButton, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { remove, reduce, addToCart, closeCart } from "../features/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

const CartDrawer = () => {
    const cart = useSelector(state => state.cart.arr);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Drawer anchor="left" open={isCartOpen} onClose={() => dispatch(closeCart())}>
            <div className="cart-drawer">
                
                <IconButton onClick={() => dispatch(closeCart())} className="cart-close-button" disableRipple disableFocusRipple
                >
                    <CloseIcon />
                </IconButton>

                <h2 className="h">Shopping Cart of B-fresh</h2>
                <img src="images/logo.jpeg" alt="Logo" className="logo-img" />
                <div className="cart-summary">
                    <span className="cart-total">סה"כ לתשלום: ₪{sum}</span>
                </div>
                <List className="cart-list">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <ListItem key={item._id} className="cart-item">
                                
                                <img
                                    src={item.img}
                                    onError={(e) => e.currentTarget.src = `${item.img}`}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                          
                                <div className="cart-item-content">
                                    <div className="cart-item-title">{item.name}</div>
                                    <div className="cart-item-price">₪{item.price} x {item.qty}</div>
                                </div>
                                
                                <div className="cart-item-actions">
                                    <IconButton onClick={() => dispatch(addToCart(item))}>+</IconButton>
                                    <IconButton onClick={() => dispatch(reduce(item))}>-</IconButton>
                                    <IconButton onClick={() => dispatch(remove(item))}>🗑</IconButton>
                                </div>
                            </ListItem>
                        ))
                    )}
                </List>

                {cart.length > 0 && (

                    <Button
                        variant="contained"

                        fullWidth
                        className="cart-full-view"
                        onClick={() => {
                            dispatch(closeCart());
                            navigate("/cart");
                        }}
                    >
                        View Full Cart
                    </Button>
                )}
            </div>
        </Drawer>
    );
};

export default CartDrawer;
