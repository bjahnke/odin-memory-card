import React from 'react';

const Card = ({ card, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(card)}>
      {card}
    </div>
  );
};

export default Card;
