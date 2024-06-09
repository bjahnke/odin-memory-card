import React, { useEffect, useState } from 'react';

const CollectedPokemon = ({ collectedIds }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        collectedIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => ({
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
            }))
        )
      );
      setPokemonDetails(details);
    };

    fetchPokemonDetails();
  }, [collectedIds]);

  return (
    <div className="collected-pokemon">
      {pokemonDetails.map(pokemon => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.image} alt={pokemon.name} />
          <h4>{pokemon.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default CollectedPokemon;