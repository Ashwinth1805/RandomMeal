import React, { useState } from "react";

const Contact = () => {
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
    maxWidth: "600px",
    margin: "60px auto",
    background: "rgba(0, 0, 0, 0.85)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4)",
    width: "90%",
    boxSizing: "border-box",
    backdropFilter: "blur(5px)",
    transition: "all 0.3s ease-in-out",
  },
  h1: {
    color: "#28a745",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "2rem",
    letterSpacing: "1px",
  },
  label: {
    display: "block",
    marginTop: "20px",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "15px",
  },
  input: {
    width: "100%",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  button: {
    background: "#28a745",
    color: "#fff",
    padding: "14px 25px",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "30px",
    width: "100%",
    fontWeight: "bold",
    transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out",
  },
  buttonHover: {
    background: "#218838",
    transform: "scale(1.02)",
  },
};


  // State to manage hover effect on button
  const [isHover, setIsHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Contact Us</h1>
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="name" style={styles.label}>
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={styles.input}
          />

          <label htmlFor="email" style={styles.label}>
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={styles.input}
          />

          <label htmlFor="message" style={styles.label}>
            Your Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            style={styles.textarea}
          ></textarea>

          <button
            type="submit"
            style={isHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
