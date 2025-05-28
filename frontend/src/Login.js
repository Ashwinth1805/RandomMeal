import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const colors = {
    darkBg: '#000000',
    formBg: '#2f2f2f',
    inputBg: '#333333',
    borderDefault: '#555555',
    orange: '#ffa500',
    orangeHover: '#e59400',
    textPrimary: '#fff',
    textSecondary: '#bfbfbf',
    shadowDark: 'rgba(0, 0, 0, 0.8)',
    shadowOrangeLight: 'rgba(255, 165, 0, 0.6)',
  };

  const styles = {
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: colors.darkBg,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      margin: 0,
      color: colors.textPrimary,
    },
    container: {
      backgroundColor: colors.formBg,
      padding: "40px 48px",
      borderRadius: "14px",
      boxShadow: `0 12px 32px ${colors.shadowDark}`,
      width: "360px",
      textAlign: "left",
      boxSizing: "border-box",
    },
    heading: {
      color: colors.orange,
      fontWeight: 700,
      fontSize: "28px",
      marginBottom: "30px",
      textAlign: "center",
      letterSpacing: "0.05em",
      textShadow: `0 2px 6px ${colors.shadowOrangeLight}`,
    },
    formGroup: {
      marginBottom: "22px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: colors.textSecondary,
      fontWeight: 600,
      fontSize: "15px",
      letterSpacing: "0.02em",
      userSelect: "none",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      border: `1.5px solid ${colors.borderDefault}`,
      borderRadius: "8px",
      boxSizing: "border-box",
      fontSize: "15px",
      backgroundColor: colors.inputBg,
      color: colors.textPrimary,
      fontWeight: 400,
      outline: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
    },
    inputFocus: {
      borderColor: colors.orange,
      boxShadow: `0 0 8px 2px ${colors.orange}`,
      backgroundColor: '#3d3d3d',
    },
    button: {
      width: "100%",
      padding: "14px 0",
      backgroundColor: colors.orange,
      border: "none",
      borderRadius: "10px",
      color: "#1a1a1a",
      fontSize: "17px",
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.04em",
      boxShadow: `0 6px 20px ${colors.shadowOrangeLight}`,
      transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease",
      userSelect: "none",
    },
    buttonHover: {
      backgroundColor: colors.orangeHover,
      boxShadow: '0 8px 28px rgba(229, 148, 0, 0.9)',
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
      minHeight: "18px",
      userSelect: "none",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (name) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    console.log("Response status:", response.status);
    console.log("Raw response text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (response.ok && data) {
      alert(data.message);
      navigate("/");
    } else {
      setError(data?.message || "Login failed! Please try again.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError("An error occurred. Please try again later.");
  }
};


  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {}),
              }}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              autoComplete="email"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedInput === 'password' ? styles.inputFocus : {}),
              }}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onMouseDown={e => {
              e.currentTarget.style.transform = 'scale(0.97)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(229, 148, 0, 0.7)';
            }}
            onMouseUp={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(229, 148, 0, 0.9)';
            }}
          >
            Login
          </button>
        </form>
        <p style={styles.errorMessage}>{error}</p>
      </div>
    </div>
  );
};

export default Login;
