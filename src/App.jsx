import React from 'react';
import './App.css';

const MilkyWayHero = () => {
  return (
    <div className="hero">
      <div className="stars"></div>
      <div className="milkyway"></div>
      <div className="shooting-stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      <div className="content">
        <h1>Jomari</h1>
        <p></p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <main>
      <MilkyWayHero />
    </main>
  );
};

export default App;
