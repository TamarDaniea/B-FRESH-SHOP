import { Link, useNavigate } from "react-router-dom";

import React from "react";
import "./Footer.css";
import Branches from "../pages/branches";


const Footer = () => {
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ✅ טור 1 - יצירת קשר */}
        <div className="footer-column">
          <h3>צור קשר</h3>
          <p>
            03-5521680

            <img src="/images/טל.gif" alt="טלפון" className="icon-gif" />
          </p>
          <p>
            office@b-fresh.org.il

            <img src="/images/מייל.gif" alt="אימייל" className="icon-gif" />
          </p>
          <p> 03-6436653
            <img src="/images/צאט.gif" alt="מיקום" className="icon-gif" />
          </p>
        </div>

        {/* ✅ טור 2 - סניפים */}
        <div className="footer-column">
          <h3> סניפים</h3>
          <p>
          <Link to="/Branches" className="branch-link">
            לכל הסניפים-לחץ
                <img src="/images/בית.gif" alt="אימייל" className="icon-gif" />
                </Link>
          </p>

        </div>

        {/* ✅ טור 3 - הכשרים */}
        <div className="footer-column">
          <h3> עקוב אחרינו</h3>
          <p>
            שתף חברים
            <img src="/images/שתף.gif" alt="אימייל" className="icon-gif" />
          </p>
          <p> גלישה חינם
            <img src="/images/ויפי.gif" alt="מיקום" className="icon-gif" />
          </p>
        </div>

        <div className="footer-column">
          <Link to="/">
            <img src="images/logo.jpeg" alt="logo" className="logo-footer" />
          </Link>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
