import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './IndexPage.css';
import { Link } from "react-router-dom";


const IndexPage = () => {
  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
  };
  const testimonialSettings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    arrows: false,
    fade: true,
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/Images/logo.jpeg" alt="Home Logo" />
          <span>Random Meal Generator</span>
        </div>
       <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/About">About</Link></li>
  <li><Link to="/Contact">Contact</Link></li>
  <li><Link to="/Feature">Features</Link></li>
</ul>
        <div className="auth-buttons">
        <Link to="/Signup"><button classname="signup">Sign Up</button></Link>
<Link to="/Login"><button className="login">Log in</button></Link>
        </div>
      </nav>

      <header className="hero">
  <h1>Discover New Meals Instantly!</h1>
  <p>Click the button below to generate a random meal suggestion.</p>
  <Link to="/Mealgen" className="meal-btn">Generate Meal</Link>
</header>

     <Slider {...carouselSettings} className="carousel">
  <div><img src="/Images/meal1.jpg" alt="Meal 1" /></div>
  <div><img src="/Images/OIP.jpeg" alt="Meal 2" /></div>
  <div><img src="/Images/OIP (1).jpeg" alt="Meal 3" /></div>
  <div><img src="/Images/meal4.jpg" alt="Meal 4" /></div>
</Slider>


      <section className="featured-meals">
        <h2>Featured Meals</h2>
        <div className="meal-cards">
          <div className="meal-card">
            <img src="/Images/featured1.jpg" alt="Meal" />
            <h3>Spaghetti Bolognese</h3>
          </div>
          <div className="meal-card">
            <img src="/Images/featured2.jpg" alt="Meal" />
            <h3>Grilled Chicken Salad</h3>
          </div>
          <div className="meal-card">
            <img src="/Images/featured3.jpeg" alt="Meal" />
            <h3>Sushi Platter</h3>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <Slider {...testimonialSettings} className="testimonial-slider">
          <div className="testimonial">
            <p>"This website helped me find amazing meal ideas every day!"</p>
            <span>- Alex</span>
          </div>
          <div className="testimonial">
            <p>"I love how easy it is to discover new dishes!"</p>
            <span>- Sarah</span>
          </div>
        </Slider>
      </section>

      <div className="footer">
        <div className="scrolling-text">
          &bull; About Us &bull; Contact Info &bull; Discover More Meals &bull; Enjoy Delicious Dishes &bull;
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
