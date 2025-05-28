import React, { useState, useRef } from "react";

const mealDatabase = [
  {
    name: "Margherita Pizza",
    ingredients: ["flour", "cheese", "tomato"],
    nutrition: "Calories: 250, Protein: 12g",
    description:
      "Mix flour and water to form dough, roll it out, spread tomato sauce, add cheese, and bake at 200°C for 15 minutes.",
    image: "Images/pizza.jpg",
  },
  {
    name: "Beef Stroganoff",
    ingredients: ["beef", "onion", "mushroom"],
    nutrition: "Calories: 320, Protein: 18g",
    description:
      "Sauté onions and mushrooms, add beef strips, cook until brown, then stir in cream and serve over rice or noodles.",
    image: "Images/beef.jpg",
  },
  {
    name: "Thai Green Curry",
    ingredients: ["chicken", "coconut milk", "green curry paste"],
    nutrition: "Calories: 290, Protein: 20g",
    description:
      "Fry curry paste, add chicken and stir-fry, pour in coconut milk, simmer, and serve with rice.",
    image: "Images/curry.jpeg",
  },
  {
    name: "Sushi Platter",
    ingredients: ["rice", "fish", "seaweed"],
    nutrition: "Calories: 200, Protein: 15g",
    description:
      "Cook sushi rice, spread on seaweed, add fresh fish slices, roll tightly, and slice into pieces.",
    image: "Images/sushi.jpeg",
  },
];

const styles = {
  body: {
    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('Images/Bgimage.jpg') center/cover no-repeat fixed",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#f0f0f0",
    minHeight: "100vh",
    padding: "60px 0",
  },
  container: {
    margin: "0 auto",
    maxWidth: "700px",
    background: "rgba(7, 7, 7, 0.8)",
    padding: "30px 35px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.8)",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    flexGrow: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#333",
  },
  generateBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "25px",
    display: "block",
    margin: "15px auto",
    transition: "transform 0.2s ease, background 0.3s ease",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  generateBtnBlue: {
    background: "#007bff",
    marginTop: "20px",
  },
  mealCard: {
    background: "#ffffffee",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "15px",
    boxShadow: "0 8px 18px rgba(0, 0, 0, 0.3)",
    color: "#000",
    fontWeight: "500",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  mealImg: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "15px",
    objectFit: "cover",
    maxHeight: "250px",
  },
  mealDescription: {
    fontSize: "15px",
    color: "#444",
    marginTop: "10px",
    lineHeight: "1.6",
  },
  suggestedMealsHeader: {
    marginTop: "30px",
    fontSize: "22px",
    color: "#e0e0e0",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
  },
};


const RandomMealGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const mealListRef = useRef(null);

  // Scroll to meal list smoothly
  const scrollToMeals = () => {
    setTimeout(() => {
      if (mealListRef.current) {
        mealListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const saveMealToHistory = (mealName) => {
    const mealHistory = JSON.parse(localStorage.getItem("mealHistory")) || [];
    mealHistory.push(mealName);
    localStorage.setItem("mealHistory", JSON.stringify(mealHistory));
  };

  const generateMeal = () => {
    const input = ingredients.trim();

    if (!input) {
      const randomMeal =
        mealDatabase[Math.floor(Math.random() * mealDatabase.length)];
      setSuggestedMeals([randomMeal]);
      saveMealToHistory(randomMeal.name);
      setShowHistory(false);
      scrollToMeals();
      return;
    }

    const inputIngredients = input
      .toLowerCase()
      .split(",")
      .map((ing) => ing.trim());

    const matchingMeals = mealDatabase.filter((meal) =>
      meal.ingredients.some((ingredient) => inputIngredients.includes(ingredient))
    );

    if (matchingMeals.length > 0) {
      setSuggestedMeals(matchingMeals);
      matchingMeals.forEach((meal) => saveMealToHistory(meal.name));
      setShowHistory(false);
      scrollToMeals();
    } else {
      setSuggestedMeals([]);
      setShowHistory(false);
      scrollToMeals();
    }
  };

  const viewHistory = () => {
    setShowHistory(true);
    scrollToMeals();
  };

  const mealHistory = JSON.parse(localStorage.getItem("mealHistory")) || [];

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Meal Generator</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            id="ingredients"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          style={styles.generateBtn}
          onClick={generateMeal}
          type="button"
          aria-label="Generate Meal"
        >
          Generate Meal
        </button>

        <div className="recent-meals" ref={mealListRef}>
          <h3 style={styles.suggestedMealsHeader}>
            {showHistory ? "Previous Meals:" : "Suggested Meals"}
          </h3>

          {showHistory ? (
            mealHistory.length === 0 ? (
              <p>No meals generated yet!</p>
            ) : (
              <ul>
                {mealHistory.map((meal, idx) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            )
          ) : suggestedMeals.length === 0 ? (
            <p>No meal suggestions yet. Try generating one!</p>
          ) : (
            suggestedMeals.map((meal, idx) => (
              <div key={idx} style={styles.mealCard}>
                <img
                  src={meal.image}
                  alt={meal.name}
                  style={styles.mealImg}
                  loading="lazy"
                />
                <strong>{meal.name}</strong>
                <br />
                <small>Ingredients: {meal.ingredients.join(", ")}</small>
                <br />
                <small>{meal.nutrition}</small>
                <p style={styles.mealDescription}>{meal.description}</p>
              </div>
            ))
          )}
        </div>

        <button
          style={{ ...styles.generateBtn, ...styles.generateBtnBlue }}
          onClick={viewHistory}
          type="button"
          aria-label="View Meal History"
        >
          View Meal History
        </button>
      </div>
    </div>
  );
};

export default RandomMealGenerator;
