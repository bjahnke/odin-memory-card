import React from 'react';

/**
 * Represents the header component of the memory game.
 *
 * @param {Object} props - The props object containing the component's properties.
 * @param {number} props.currentScore - The current score of the game.
 * @param {number} props.bestScore - The best score achieved in the game.
 * @param {number} props.maxScore - The maximum possible score in the game.
 * @param {number} props.gamesBeaten - The number of games beaten.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({ currentScore, bestScore, maxScore, gamesBeaten }) => {
  return (
    <header>
      <h1>Memory Game</h1>
      <p>Description: Select all images without repeating to increase score!</p>
      <p>Beat games to add pokemon to your collection!</p>
      <p>Current Score: {currentScore}</p>
      <p>Best Score: {bestScore} / {maxScore}</p>
      <p>Games Beaten: {gamesBeaten}</p>
      
    </header>
  );
};

export default Header;
