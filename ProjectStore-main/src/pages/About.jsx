import React from "react";
import { motion } from "framer-motion";

const About = () => {
    const images = [
        "/images/d.png",
        "/images/b.jpg",
        "/images/c.gif",
        "/images/f.jpg",
        "/images/g.png",
        "/images/h.jpg",
        "/images/ii.jpg",
        "/images/m.jpg",
        "/images/n.jpg",
        "/images/p.png",
        "/images/r.jpg",
        "/images/sd.jpg",
        "/images/tt.jpg",
        "/images/uu.jpg",
        "/images/m.jpg",
        "/images/v.jpg",
        "/images/yy.jpg",
        "/images/z.jpg",
        "/images/as.jpg",
        "/images/bs.jpg",
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/images/about.png" alt="תפריט" style={{ width: "80%" }} />
            <img src="/images/ab.png" alt="תפריט" style={{ width: "50%", marginTop: "20px" }} />
            <h2 style={{ fontSize: "45px", fontWeight: "bold", color: "#0099FF", marginTop: "40px" }}>
                חלק ממיתוגנו בחברה
            </h2>

            {/* גלריית תמונות */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    width: "100%", // תמונות מתפשטות על כל הרוחב
                    marginTop: "30px",
                }}
            >
                {images.map((img, index) => (
                    <motion.img
                        key={index}
                        src={img}
                        alt={`תמונה ${index + 1}`}
                        style={{
                            width: "100%", // כל תמונה תופס 100% רוחב של התא שלה
                            height: "200px", // גובה תמונה אחיד
                            objectFit: "cover",
                            borderRadius: "10px",
                            transition: "transform 0.2s ease-in-out", // זמן מעבר מהיר יותר
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // צל קטן לתמונה
                        }}
                        animate={{
                            scale: 1.05, // הגדלה קלה לכל התמונה
                            rotate: 3, // סיבוב קטן
                            y: -10, // הזזה כלפי מעלה
                        }}
                        transition={{
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25, // אפקט ריבאונד יותר חזק
                            repeat: Infinity, // האפקט יתבצע באופן אינסופי
                            repeatType: "reverse", // חוזר אחורה למצב ההתחלתי
                            duration: 2, // משך הזמן לכל חזרה
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default About;
