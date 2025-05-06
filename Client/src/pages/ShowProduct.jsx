import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/productServer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, openCart } from "../features/cartSlice";
import { removeProduct } from "../features/productSlice";

import "./ShowProduct.css";

const ShowProduct = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(st => st.user.currentUser);

    useEffect(() => {
        if (!deleted) {
            getProductById(id)
                .then(res => setProductData(res.data))
                .catch(err => {
                    alert("לא ניתן להביא את המוצר: " + err.message);
                });
        }
    }, [id, deleted]);

    if (!productData) {
        return <p>Loading...</p>;
    }

    const handleClose = () => {
        navigate(location.pathname.includes("cart") ? "/cart" : "/home");
    };

    const imagePath = productData.img?.replace("../public/", "/");

    return (
        <div className="overlay">
            <div className="product-container">
                <img src={imagePath} alt={productData.name} className="product-image" />

                <div className="product-details">
                    <button onClick={handleClose} className="close-button">X</button>
                    <h2 className="product-title">{productData.name}</h2>
                    <p className="product-description">{productData.description}</p>
                    <p className="product-price">₪{productData.price}</p>
                    <p className="product-category">{productData.category}</p>

                    <input type="button" className="action-button" value="+" onClick={() => {
                        dispatch(addToCart(productData));
                        navigate("/home");
                        dispatch(openCart());
                    }} />
                    {user.role === "manager" && (
                        <div className="manager-buttons">
                            <button className="action-button" onClick={() => navigate(`/edit-product/${productData._id}`)}>
                                Edit
                            </button>
                            <input
                                type="button"
                                className="action-button"
                                onClick={() => {
                                    deleteProduct(productData._id, user?.token)
                                        .then(() => {
                                            alert("המוצר נמחק בהצלחה");
                                            dispatch(removeProduct(productData._id));
                                            navigate("/home");
                                        })
                                        .catch(err => {
                                            alert("לא ניתן למחוק את המוצר: " + err.message);
                                        });
                                }}
                                value="מחק מוצר"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowProduct;
