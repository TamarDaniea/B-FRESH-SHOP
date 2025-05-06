import { useSelector, useDispatch } from "react-redux";
import { addToCart, reduce, remove } from "../features/cartSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"; // אייקון פח
import "./Cart.css"; // שימוש בעיצוב החדש
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arrCart = useSelector(state => state.cart.arr);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);
    const isCurrentUser = useSelector(state => state.user.currentUser);


    const [items, setItems] = useState([]);

    useEffect(() => {
      // התחלת האנימציה אחרי שהקומפוננטה נטענת
      const timeout = setTimeout(() => {
        setItems([
          "/images/item1.webp",
          "/images/item2.webp",
          "/images/item3.webp",
          "../images/item4.webp",
        ]);
      }, 1000);
      return () => clearTimeout(timeout);
    }, []);
    const handleFinishOrder = () => {
        if (!isCurrentUser) {
            const confirmLogin = window.confirm("You are not logged in. Do you want to go to the login page?");
            if (confirmLogin) {
                navigate("/Login");
            }
        } else {
            navigate("/EndOrder");
        }
    };
    {
        arrCart.map(item => {
            console.log("Cart - Image source:", `${item.img}`);

            return (
                <li key={item._id} className="cart-item-container">
                    <img
                        className="cart-item-image"
                        src={item.img}
                        onError={(e) => e.currentTarget.src = `${item.img}`}
                        alt={item.name}
                    />
                </li>
            );
        })
    }

    return (
        <div className="cart-page-container">
            {cnt > 0 && (
                <div className="cart-summary-container">
                <h2 style={{color:"black"}}>העגלה שלך</h2>
                    <span>{`מספר פריטים ${cnt}`}</span> | <span>{`סה"כ: ₪${sum}`}</span>
                </div>
            )}
            {arrCart.length === 0 ? (
                <div style={{ position: "relative", textAlign: "center", marginTop: "50px" }}>
                <h3 style={{ fontSize: "25px" }}>העגלה ריקה</h3>
                <h3> רוצו למלא אותה במשקאות המומלצים של B-FRESH </h3>
                <div style={{ position: "relative", display: "inline-block",zIndex: 1 }}>
                  {/* תמונת העגלה */}
                  <img src="/images/empty.png" alt="עגלה ריקה" width="170px" />
                  
                  {/* תמונות שנכנסות לעגלה */}
                  {items.map((src, index) => (
                    <motion.img
                      key={index}
                      src={src}
                      alt="מוצר"
                      width="70px"
                      style={{
                        position: "absolute",
                        left: `${index * 40}px`, 
                        top: "20px", 
                        zIndex: -1, 
                      }}
                      initial={{ x: -300, y: -200, opacity: 0 }}
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 1,
                        delay: index * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

            ) : (
                <ul className="cart-items-list">
                    {arrCart.map(item => (

                        <li key={item._id} className="cart-item-container">
                            {/* תמונת מוצר */}
                            <img
                                className="cart-item-image"
                                src={item.img}
                                onError={(e) => e.currentTarget.src = `${item.img}`}
                                alt={item.name}
                            />

                            {/* שם המוצר */}
                            <div className="cart-item-title">
                                <Link to={`/cart/details/${item._id}`} className="cart-item-name">
                                    {item.name}
                                </Link>
                            </div>

                            {/* מחיר ליחידה */}
                            <div className="cart-item-unit-price">₪{item.price}</div>

                            {/* כמות עם כפתורים */}
                            <div className="cart-item-quantity">
                                <button onClick={() => dispatch(addToCart(item))}>+</button>
                                <span>{item.qty}</span>
                                <button onClick={() => dispatch(reduce(item))}>-</button>
                            </div>

                            {/* מחיר כולל למוצר */}
                            <div className="cart-item-total-price">₪{item.price * item.qty}</div>

                            {/* כפתור מחיקה */}
                            <IconButton className="cart-item-remove-btn" onClick={() => dispatch(remove(item))}>
                                <DeleteOutlinedIcon fontSize="large" />
                            </IconButton>
                        </li>
                    ))}
                </ul>
            )}

            {arrCart.length > 0 && (
                <button className="cart-checkout-btn" onClick={handleFinishOrder}>
                    Finish Order
                </button>
            )}

            <Outlet />
        </div>
    );
};

export default Cart;
