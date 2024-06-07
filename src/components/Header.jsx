import React from 'react';

const Header = ({ currentScore, bestScore }) => {
  return (
    <header>
      <h1>Memory Game</h1>
      <p>Current Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
    </header>
  );
};

export default Header;
