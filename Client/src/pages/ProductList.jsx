import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct, getTotalPages } from "../api/productServer";
import { setProducts } from "../features/productSlice";
import { addToCart, openCart, closeCart } from "../features/cartSlice";
import Product from "../components/Product";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './ProductList.css';


const categoryIcon = <img src="../public/images/wine.png" alt="category icon" className="category-icon" />;

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const categoryParam = new URLSearchParams(location.search).get("category");

    const products = useSelector(state => state.product.arr);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const categoryImages = {
        " BRULEE": "/images/a.jpeg",
        " TEA": "/images/q.jpeg",
        "B-CREAM CAFÉ": "/images/b.jpeg",
        "B-FREEZE": "/images/images.jpeg",
    };

    const categoryRefs = {
        " BRULEE": useRef(null),
        " TEA": useRef(null),
        "B-CREAM CAFÉ": useRef(null),
        "B-FREEZE": useRef(null),

    };
    useEffect(() => {
        console.log("📜 Scrolling to top on page change...");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        getAllProduct(currentPage)
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(err => {
                alert("לא ניתן להביא את המוצרים: " + err.message);
            });

        getTotalPages()
            .then(res => {
                setTotalPages(res.data.pages);
            })
            .catch(err => {
                console.log("שגיאה בקבלת מספר העמודים: " + err.message);
            });

    }, [dispatch, currentPage]);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        getAllProduct(page)
            .then(res => {
                dispatch(setProducts(res.data));
                setCurrentPage(page);
            })
            .catch(err => console.log("שגיאה בטעינת עמוד", page, err.message));
    };

    // עדכון רשימת המוצרים המסוננים לפי קטגוריה מה-URL
    useEffect(() => {
        if (categoryParam) {
            const filtered = products.filter(product => product.category === categoryParam);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, categoryParam]);

    // גלילה לקטגוריה אם הפרמטר קיים
    useEffect(() => {
        if (categoryParam && categoryRefs[categoryParam]?.current) {
            categoryRefs[categoryParam].current.scrollIntoView({ behavior: "smooth" });
        }
    }, [categoryParam, filteredProducts]);
    const categories = Object.keys(categoryRefs);

    return (
        <>

            <h1>  B-fresh הטעמים של  </h1>
            <div className="floating-category-menu">
                {categories.map((category) => (
                    <div key={category} className="img-item">
                        <img
                            src={categoryImages[category]}
                            alt={category}
                            className="category-image"
                            onClick={() => {
                                navigate(`/home?category=${category}`);
                                if (categoryRefs[category]?.current) {
                                    categoryRefs[category].current.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        />
                        <p className="img-text">{category}</p>
                    </div>
                ))}
            </div>



            {/* הצגת מוצרים לפי קטגוריות */}
            {Object.keys(categoryRefs).map(category => {
                const categoryItems = filteredProducts.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                    <div key={category} className="category-section" ref={categoryRefs[category]}>

                        <div className="category-products">
                            {categoryItems.map(item => (
                                <div key={item._id} className="product-item">
                                    <Link to={`/home/details/${item._id}`}>
                                        <Product product={item} />
                                    </Link>
                                    <div className="product-actions">
                                        <IconButton
                                            sx={{
                                                color: "black",
                                                fontSize: "3rem",
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                                borderRadius: "50%"
                                            }}
                                            aria-label="add to shopping cart"
                                            onClick={() => {
                                                dispatch(addToCart(item));
                                                dispatch(openCart());
                                                setTimeout(() => {
                                                    dispatch(closeCart());
                                                }, 2000);

                                            }}
                                            disableRipple={true}
                                        >
                                            <AddShoppingCartIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* ניווט בין עמודים */}
            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    &#60; {/* חץ שמאלה */}
                </button>

                <span>{currentPage} / {totalPages}</span>

                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    &#62; {/* חץ ימינה */}
                </button>
            </div>

            <Outlet />
        </>
    );
};

export default ProductList;



