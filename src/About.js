import React from "react";

const About = () => {
  const styles = {
    body: {
      backgroundImage: "url('Images/Bgimage.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      fontFamily: "'Segoe UI', sans-serif",
      margin: 0,
      padding: 0,
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      maxWidth: "800px",
      margin: "60px auto",
      padding: "40px",
      background: "rgba(0, 0, 0, 0.9)",
      borderRadius: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
      width: "90%",
      boxSizing: "border-box",
    },
    h1: {
      color: "#28a745",
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "32px",
    },
    p: {
      fontSize: "18px",
      lineHeight: 1.8,
      marginBottom: "15px",
      color: "#ddd",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>About Random Meal Generator</h1>
        <p style={styles.p}>
          The Random Meal Generator is a web-based application that suggests meals based on the ingredients you have or based on your preferences like spicy, mild, or sweet.
        </p>
        <p style={styles.p}>
          It uses a MongoDB backend to store meal data and user preferences, and leverages intelligent filtering and randomization to offer quick and delicious suggestions.
        </p>
        <p style={styles.p}>
          Whether you are unsure what to cook or trying to discover new dishes, our generator helps make cooking easy and fun!
        </p>
      </div>
    </div>
  );
};

export default About;
