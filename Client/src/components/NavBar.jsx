import { Link, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { deledeCart } from "../features/cartSlice";
import { useState, useEffect, useRef } from "react";
import './NavBar.css';

// ייבוא אייקונים מ-MUI
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const NavBar = () => {
    const isCurrentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);
    const toggleTooltip = () => setShowTooltip(prev => !prev);
    const cnt = useSelector(state => state.cart.count)
    // סוגר את ה-tooltip כשנלחץ מחוץ אליו
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">

            <Link to="/">
                <img src="data:image/;base64,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" alt="logo" />
            </Link>


            <Link to="/cart" className="cart-icon">
                <img src="/images/cart.gif" alt="cart" className="cart-image" />
                {cnt > 0 && <span className="cart-count">{cnt}</span>}
            </Link>
   

            <ul className="nav-links">
                {!isCurrentUser && (
                    <>
                        <li><Link to="LogIn">LogIn</Link></li>
                        <span className="separator"></span>
                        <li><Link to="SignUp">SignUp</Link></li>
                    </>
                )}
                {isCurrentUser && isCurrentUser.role === "manager" && (
                    <>
                        <li><Link to="AddProduct">AddProduct</Link></li>
                        <span className="separator"></span>
                        <li><Link to="AllOrder">כל ההזמנות</Link></li>
                    </>
                )}
                <span className="separator"></span>
                <li><Link to="home">תפריט</Link></li>
                <span className="separator"></span>
                <li><Link to="about">אודות</Link></li>
                <span className="separator"></span>
                <li><Link to="/">ראשי</Link></li>
            </ul>

            {isCurrentUser && (
                <div className="profile-container" ref={tooltipRef}>

                    <div className="profile-picture" onClick={toggleTooltip}>
                        {isCurrentUser.userName[0].toUpperCase()}
                    </div>

                    {showTooltip && (
                        <div className="tooltip">
                            <p>{isCurrentUser.userName}  שלום</p>
                            
                            <ul>
                                <li><Link to="MyOrder"><ListAltIcon /> ההזמנות שלי</Link></li>
                                <li><Link to="cart"><ShoppingCartIcon /> הסל שלי</Link></li>
                                {isCurrentUser && (
                                    <Link
                                        to="/LogIn"
                                        className="logout-button"
                                        onClick={() => {
                                            dispatch(userOut());
                                            dispatch(deledeCart());
                                        }}
                                    >
                                        <LogoutIcon /> התנתק
                                    </Link>
                                )}
                                <li><Link to="LogIn"><SwapHorizIcon /> החלף חשבון</Link></li>
                            </ul>
                        </div>
                    )}
                </div>

            )}


        </nav>
    );
};

export default NavBar;
