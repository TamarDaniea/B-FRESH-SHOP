import React, { useState } from "react";
import { TextField, Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";

const branchesData = [
  { id: 1, name: "BIG גדרה", kosher: true, city: "גדרה" },
  { id: 2, name: "אור יהודה - קניון עזריאלי", kosher: true, city: "אור יהודה" },
  { id: 3, name: "איכילוב",  city: "תל אביב" },
  { id: 4, name: "אילת ICE mall", kosher: true, city: "אילת" },
  { id: 5, name: "אילת מול הים",  city: "אילת" },
  { id: 6, name: "תל אביב דיזינגוף", city: "תל אביב" },
  { id: 7, name: "חיפה מרכז", city: "חיפה" },
  { id: 8, name: "ירושלים גבעה", kosher: true,city: "ירושלים" },
  { id: 9, name: "רמת גן אלרוב", city: "רמת גן" },
  { id: 10, name: "פתח תקווה מרכז", city: "פתח תקווה" },
  { id: 11, name: "נתניה קניון", kosher: true,city: "נתניה" },
  { id: 12, name: "תל אביב מרכז", city: "תל אביב" },
  { id: 13, name: "אשדוד חדש", city: "אשדוד" },
  { id: 14, name: "חדרה חוף", kosher: true,city: "חדרה" },
  { id: 15, name: "ראשון לציון המערב", city: "ראשון לציון" },
  { id: 16, name: "חולון מרכז", city: "חולון" },
  { id: 17, name: "עפולה צפון", city: "עפולה" },
  { id: 18, name: "באר שבע מרכז",kosher: true, city: "באר שבע" },
  { id: 19, name: "הרצליה פיתוח", city: "הרצליה" },
  { id: 20, name: "אשקלון דרום", city: "אשקלון" },
  { id: 21, name: "תל אביב רמת אביב", kosher: true,city: "תל אביב" },
  { id: 22, name: "רחובות מרכז", city: "רחובות" },
  { id: 23, name: "כפר סבא מרכז", city: "כפר סבא" },
  { id: 24, name: "נהריה חוף", kosher: true,city: "נהריה" },
  { id: 25, name: "נצרת עילית", city: "נצרת עילית" },
  { id: 26, name: "בני ברק מרכז",  kosher: true,city: "בני ברק" },
  { id: 27, name: "חולון דיזינגוף",kosher: true, city: "חולון" },
  { id: 28, name: "רמלה מרכז", city: "רמלה" },
  { id: 29, name: "מעלות צפון", kosher: true,city: "מעלות" },
  { id: 30, name: "חיפה קריית אליעזר", city: "חיפה" },
];

const Branches = () => {
  const [search, setSearch] = useState("");
  const [kosherFilter, setKosherFilter] = useState(false);

  const filteredBranches = branchesData.filter((branch) => {
    const matchesSearch = branch.name.includes(search);
    const matchesKosher = kosherFilter ? branch.kosher : true;
    return matchesSearch && matchesKosher;
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
     <img src="/images/bbr.webp"  alt="Header"
  style={{
    width: "100%",
    height: "140px", // גובה נמוך = תמונה צרה
    objectFit: "cover", // תמלא את הרוחב בצורה טובה
    display: "block",
    marginBottom: "20px"
  }} />

      <TextField
        fullWidth
        variant="outlined"
        placeholder="חיפוש סניף"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={kosherFilter}
            onChange={(e) => setKosherFilter(e.target.checked)}
            color="primary"
          />
        }
        label="הצג רק סניפים כשרים"
        sx={{ mb: 2 }}
      />
      <Box sx={{ bgcolor: "#f5f5f5", padding: 2, borderRadius: 2, maxHeight: 400, overflowY: "auto" }}>
        {filteredBranches.map((branch) => (
          <Box key={branch.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 1, borderBottom: "1px solid #ddd" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {branch.kosher && (
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#0099FF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: 12,
                  marginRight: 1,
                }}>
                  כשר
                </Box>
              )}
              <Typography>{branch.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: 1, color: "#555" }}>{branch.city}</Typography>
              <FaMapMarkerAlt size={20} color="#888" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Branches;
