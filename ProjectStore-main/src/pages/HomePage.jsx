import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { FaShoppingCart, FaGlassCheers } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
    
      <img src="/images/welcome.png" alt="" className="img-banner-full" />

     
      <div className="image-with-button right">
        <img src="/images/g.png" alt="g" className="img-banner-full" />
        <button className="side-button" onClick={() => navigate("/home")}>
          <FaGlassCheers className="icon" />
          למשקאות שלנו
        </button>
      </div>

      <div className="image-with-button left third">
        <img src="/images/p2.jpeg" alt="ss" className="img-banner-full" />
        <button className="side-button" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="icon" />
          להזמנה ברגע
        </button>
      </div>
    </>
  );
};

export default HomePage;
