import React, { useState } from 'react';
import axios from 'axios';
import { colors, styles } from './styles';

const SignupPage = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleFocus = (name) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  // Add these mouse event handlers here:
  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = colors.orangeHover;
    e.currentTarget.style.boxShadow = '0 8px 28px rgba(229, 148, 0, 0.9)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = colors.orange;
    e.currentTarget.style.boxShadow = `0 6px 20px ${colors.shadowOrangeLight}`;
  };

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'scale(0.96)';
    e.currentTarget.style.boxShadow = '0 4px 14px rgba(229, 148, 0, 0.7)';
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 8px 28px rgba(229, 148, 0, 0.9)';
  };

  return (
    <div style={styles.page}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Sign Up</h2>

        <label style={styles.label} htmlFor="name">Name:</label>
        <input
          style={{
            ...styles.input,
            ...(focusedInput === 'name' ? styles.inputFocus : {}),
          }}
          type="text"
          id="name"
          name="name"
          required
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label style={styles.label} htmlFor="email">Email:</label>
        <input
          style={{
            ...styles.input,
            ...(focusedInput === 'email' ? styles.inputFocus : {}),
          }}
          type="email"
          id="email"
          name="email"
          required
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input
          style={{
            ...styles.input,
            ...(focusedInput === 'password' ? styles.inputFocus : {}),
          }}
          type="password"
          id="password"
          name="password"
          required
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          Sign Up
        </button>

        {message && <p style={{ marginTop: '15px', color: colors.orange }}>{message}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
