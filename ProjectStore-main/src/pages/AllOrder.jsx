import { useEffect, useState } from "react";
import { getAllOrders, updateStatusOrder } from "../api/orderService";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./OrderList.css";

const AllOrder = () => {
  const [searchDate, setSearchDate] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        console.log("🔹 הזמנות שהתקבלו:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("❌ שגיאה בשליפת הנתונים:", err);
        alert("לא ניתן להביא את המוצרים: " + err.message);
      });
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      const res = await updateStatusOrder(orderId);
      console.log("✅ סטטוס עודכן בהצלחה:", res.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, isSend: res.data.isSend }
            : order
        )
      );
    } catch (err) {
      console.error("❌ שגיאה בעדכון הסטטוס:", err);
      alert("⛔ אין לך הרשאה לעדכן סטטוס.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchDate) return true;

    const orderDate = new Date(order.date);
    const formattedOrderDate = orderDate.toLocaleDateString("sv-SE");

    return formattedOrderDate === searchDate;
  });

  return (
    <div className="order-list-container">
      <h2>כל ההזמנות</h2>

      <TextField
        label="חפש לפי תאריך"
        type="date"
        variant="outlined"
        fullWidth
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {filteredOrders.length > 0 ? (
        <div className="order-list">
          {filteredOrders.map((order) => (
            <Accordion key={order._id} className="order-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="order-summary-header"
              >
                <Typography className="order-number">
                  מספר הזמנה: {order.orderNumber}
                </Typography>
                <Typography className="order-date">
                  תאריך: {new Date(order.date).toLocaleDateString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="order-products">
                  {order.products.map((item, index) => (
                    <div key={index} className="order-product">
                      <img
                        src={item?.product?.img}
                        onError={(e) =>
                          (e.currentTarget.src = `{item?.product?.img}`)
                        }
                        alt={item?.product?.name || "תמונה חסרה"}
                      />
                      <span className="product-name">
                        {item.product?.name}
                      </span>
                      <span className="product-details">
                        {item.count} * {item.product?.price} ₪
                      </span>
                      <span className="product-price">
                        סה"כ: {item.count * item.product?.price} ₪
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="order-divider" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <p className="order-summary">
                    סה"כ לתשלום: {order.price} ₪
                  </p>

           
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <p className="no-orders">אין הזמנות התואמות לתאריך.</p>
      )}
    </div>
  );
};

export default AllOrder;
