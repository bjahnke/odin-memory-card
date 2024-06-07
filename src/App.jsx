import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import './App.css';


/**
 * Generates an array of cards.
 *
 * @returns {number[]} An array of cards.
 */
const generateCards = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState(generateCards());

  // useEffect(() => {
  //   shuffleCards();
  // }, []);


  const shuffleCards = () => {
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (card) => {
    if (selectedCards.includes(card)) {
      setCurrentScore(0);
      setSelectedCards([]);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setSelectedCards([...selectedCards, card]);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
    shuffleCards();
  };

  return (
    <div className="App">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};

export default App;
