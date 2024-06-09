import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import Card from './components/Card';

/*
On render, generate cards with key and image properties.

*/
// Adjust based on the current number of Pokémon
const MAX_POKEMON_ID = 1025;

/**
 * Generates a set of unique random numbers by selecting random indices from an initial set and then removing the selected element.
 * @param {number} inputLength - The size of the total pool of numbers to select from.
 * @param {number} outputLength - The number of unique numbers to generate.
 * @returns {Set<number>} - A set containing unique random numbers.
 */
function generateUniqueIds(inputLength, outputLength) {
  // Ensure the outputLength is not greater than the inputLength
  if (outputLength > inputLength) {
    throw new Error("outputLength cannot be greater than inputLength");
  }

  // Create an array from 1 to inputLength
  const inputSet = Array.from({ length: inputLength }, (_, index) => index + 1);
  const outputSet = new Set();

  // Continue until the outputSet reaches the desired outputLength
  while (outputSet.size < outputLength) {
    // Select a random index from the inputSet
    const randomIndex = Math.floor(Math.random() * inputSet.length);
    // Add the element at the random index to the outputSet
    outputSet.add(inputSet[randomIndex]);
    // Remove the selected element from the inputSet to prevent re-selection
    inputSet.splice(randomIndex, 1);
  }

  return outputSet;
}

const App = () => {
  // Current score achieved by the user in the current game round
  const [currentScore, setCurrentScore] = useState(0);
  // Highest score achieved by the user in the current game session
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const cardIds = generateUniqueIds(MAX_POKEMON_ID, 12);
    const fetchPokemonImage = async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data.sprites.front_default;
    }
  // Use Promise.all to wait for all promises to resolve
    const fetchCardData = async () => {
      const promises = Array.from(cardIds).map(id => fetchPokemonImage(id).then(image => ({ id, image })));
      const resolvedCardData = await Promise.all(promises);
      setCardData(resolvedCardData);
    };

    fetchCardData();
  }, []);


  const shuffleCards = () => {
    setCardData((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (card_id) => {
    if (selectedCards.includes(card_id)) {
      setCurrentScore(0);
      setSelectedCards([]);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setSelectedCards([...selectedCards, card_id]);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
    shuffleCards();
  };

  return (
    <div className="App">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <div className="gameBoard">
        {cardData.map((card) => (
          <Card key={card.id} id={card.id} image={card.image} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
