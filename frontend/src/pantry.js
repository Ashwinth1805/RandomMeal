import React, { useState, useEffect } from "react";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(to bottom right, #2c3e50, #bdc3c7)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  heading1: {
    marginTop: "40px",
    textAlign: "center",
  },
  heading2: {
    marginTop: "40px",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1em",
    outline: "none",
    backgroundColor: "#ecf0f1",
    color: "#2c3e50",
    minWidth: "150px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1em",
    outline: "none",
    backgroundColor: "#3498db",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  ingredientList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  listItem: {
    background: "rgba(255, 255, 255, 0.2)",
    margin: "8px 0",
    padding: "10px 20px",
    borderRadius: "10px",
    backdropFilter: "blur(4px)",
    textAlign: "center",
  },
};

const PantryManager = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);

  const loadIngredients = () => {
    setLoading(true);
    setError(null);
    fetch("/api/pantry")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setIngredients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading ingredients.");
        setLoading(false);
        console.error(err);
      });
  };

  const addIngredient = () => {
    if (!name.trim() || !quantity.trim()) {
      alert("Please enter both name and quantity.");
      return;
    }

    fetch("/api/pantry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), quantity: quantity.trim() }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("HTTP status " + response.status);
        return response.json();
      })
      .then(() => {
        setName("");
        setQuantity("");
        loadIngredients();
      })
      .catch((err) => {
        console.error("Failed to add ingredient:", err);
        alert("Failed to add ingredient. Please try again.");
      });
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  return (
    <div style={styles.body}>
      <h1 style={styles.heading1}>Manage Your Ingredients</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="e.g., clove"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <button
          type="button"
          style={{
            ...styles.button,
            ...(buttonHover ? { backgroundColor: "#2980b9" } : {}),
          }}
          onClick={addIngredient}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          aria-label="Add Ingredient"
        >
          Add Ingredient
        </button>
      </div>

      <h2 style={styles.heading2}>Your Ingredients</h2>
      <ul id="ingredientList" style={styles.ingredientList}>
        {loading && <li style={styles.listItem}>Loading...</li>}
        {error && <li style={styles.listItem}>{error}</li>}
        {!loading && !error && ingredients.length === 0 && (
          <li style={styles.listItem}>No ingredients added yet.</li>
        )}
        {!loading &&
          !error &&
          ingredients.map((item, idx) => (
            <li key={idx} style={styles.listItem}>
              {item.name} - {item.quantity}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PantryManager;
