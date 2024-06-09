import React, { useState, useEffect } from 'react';

const Card = ({ id, image, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <img src={image} alt={`Card ${id}`} />
    </div>
  );
};

export default Card;
