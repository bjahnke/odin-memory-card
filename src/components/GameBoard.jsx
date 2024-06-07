import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card key={card} card={card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default GameBoard;
