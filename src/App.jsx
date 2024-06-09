import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import Card from './components/Card';
import CollectedPokemon from './components/CollectedPokemon';

/*
On render, generate cards with key and image properties.

*/
// Adjust based on the current number of Pokémon
const MAX_POKEMON_ID = 1025;
const GAME_SIZE = 12;

/**
 * Generates a set of unique random numbers by selecting random indices from an initial set and then removing the selected element.
 * @param {number} inputLength - The size of the total pool of numbers to select from.
 * @param {number} outputLength - The number of unique numbers to generate.
 * @returns {Set<number>} - A set containing unique random numbers.
 */
function generateUniqueIds(inputLength, outputLength, exclude = new Set()) {
  // Ensure the outputLength is not greater than the inputLength
  if (outputLength > inputLength) {
    throw new Error("outputLength cannot be greater than inputLength");
  }

  // Create an array from 1 to inputLength, skipping any numbers in the exclude set
  const inputSet = Array.from({ length: inputLength }, (_, i) => i + 1).filter((num) => !exclude.has(num));

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

const setCardDataAsPokemon = async (cardIds, setCardData) => {
  const promises = Array.from(cardIds).map(id => fetchPokemonImage(id).then(image => ({ id, image })));
  const resolvedCardData = await Promise.all(promises);
  setCardData(resolvedCardData);
}

const fetchPokemonImage = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data.sprites.front_default;
}

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gamesBeaten, setGamesBeaten] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [collectedPokemon, setCollectedPokemon] = useState(new Set()); // New state for collected Pokémon
  const [activeTab, setActiveTab] = useState('game'); // New state for active tab

  useEffect(() => {
    const cardIds = generateUniqueIds(MAX_POKEMON_ID, GAME_SIZE);
    setCardDataAsPokemon(cardIds, setCardData);
  }, []);

  const resetGame = () => {
    setCurrentScore(0);
    setBestScore(0);
    setSelectedCards([]);
    const cardIds = generateUniqueIds(MAX_POKEMON_ID, GAME_SIZE);
    setCardDataAsPokemon(cardIds, setCardData);
  };

  const shuffleCards = () => {
    setCardData((cardData) => {
      const shuffledCards = [...cardData];
      shuffledCards.sort(() => Math.random() - 0.5);
      return shuffledCards;
    })
  }

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
      if (newScore === GAME_SIZE) {
        setGamesBeaten(gamesBeaten + 1);
        setCollectedPokemon(new Set([...collectedPokemon, ...selectedCards, card_id])); // Update collected Pokémon
        resetGame();
      }
    }
    shuffleCards();
  };

  return (
    <div className="App">
      <div className="tabs">
        <button onClick={() => setActiveTab('game')}>Memory Game</button>
        <button onClick={() => setActiveTab('catalog')}>Collected Pokémon</button>
      </div>
      {activeTab === 'game' && (
        <>
          <Header currentScore={currentScore} bestScore={bestScore} maxScore={GAME_SIZE} gamesBeaten={gamesBeaten}/>
          <div className="game-board">
            {cardData.map((card) => (
              <Card key={card.id} id={card.id} image={card.image} onCardClick={handleCardClick} />
            ))}
          </div>
        </>
      )}
      {activeTab === 'catalog' && (
        <CollectedPokemon collectedIds={Array.from(collectedPokemon)} />
      )}
    </div>
  );
};

export default App;
