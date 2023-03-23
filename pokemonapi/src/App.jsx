import { useEffect, useState } from 'react';
import Banned from './components/Banned';
import History from './components/History';
import axios from 'axios';
import './App.css';

function App() {
  const [currentImage, setCurrentImage] = useState('');
  const [prevImages, setPrevImages] = useState([]);
  const [name, setName] = useState('');
  const [ability, setAbility] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const handleBanAbilityClick = () => {
    setBannedAttributes((prevBannedAttributes) => [...prevBannedAttributes, ability]);
  };

  const handleBanTypeClick = () => {
    setBannedAttributes((prevBannedAttributes) => [...prevBannedAttributes, type]);
  };

  const handleBanWeightClick = () => {
    setBannedAttributes((prevBannedAttributes) => [...prevBannedAttributes, weight]);
  };

  const handleUnbanAttributeClick = (attribute) => {
    setBannedAttributes((prevBannedAttributes) =>
      prevBannedAttributes.filter((bannedAttribute) => bannedAttribute !== attribute)
    );
  };

  const getRandomPokemon = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleDiscoverClick = async () => {
    setLoading(true);

    let randomPokemon = null;
    while (!randomPokemon || bannedAttributes.includes(randomPokemon.abilities[0].ability.name) || bannedAttributes.includes(randomPokemon.types[0].type.name) || bannedAttributes.includes(randomPokemon.weight)) {
      const randomIndex = getRandomPokemon(0, pokeData.length - 1);
      randomPokemon = pokeData[randomIndex];
    }
    // const randomIndex = getRandomPokemon(0, pokeData.length - 1);
    // const randomPokemon = pokeData[randomIndex];

    const image = randomPokemon.sprites.front_default;
    const name = randomPokemon.name;
    const pokemonAbility = randomPokemon.abilities[0].ability.name;
    const pokemonType = randomPokemon.types[0].type.name;
    const pokemonWeight = randomPokemon.weight;

    setCurrentImage(image);
    setName(name);
    setAbility(pokemonAbility);
    setType(pokemonType);
    setWeight(pokemonWeight);
    setPrevImages((prevImages) => [...prevImages, image]);
    setLoading(false);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url);
      const data = result.data.results;
      const promises = data.map((pokemon) => axios.get(pokemon.url));
      const results = await Promise.all(promises);
      const pokemonData = results.map((result) => result.data);
      setPokeData(pokemonData);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (bannedAttributes.includes(ability) || bannedAttributes.includes(type) || bannedAttributes.includes(weight)) {
      handleDiscoverClick();
    }
  }, []);

  return (
   
    <div className="app">
      <h1 className='header'>P<img src="https://i.imgur.com/9p2WsIV.png" width="45px" height="45px" />KEM<img src="https://i.imgur.com/9p2WsIV.png" width="45px" height="45px" />N</h1>
      <div className="display-page">
        <h1>Discover That Pokemon!</h1>
        <h3>Sort through a wide variety of Pokemon</h3>
        
        <div className="current-image-container">
              {currentImage ? (
                <div>
                  <img src={currentImage} alt={name} width='200px' height='200px' />
                <p>{name}</p>
                </div>
              ) : (
                  <div ></div>
                   )}  
                    {currentImage ? (
                      <div className='ban-container'>
                      <button className='banbutton' onClick={handleBanAbilityClick}>Ability: {ability}</button>
                      <button className='banbutton' onClick={handleBanTypeClick}>Type: {type}</button>
                      <button className='banbutton' onClick={handleBanWeightClick}>Weighs: {weight} ibs</button>
                    </div>
                    ):(
                      <div>
                        <h5>Press <i>Discover</i> To Start</h5>
                      </div>
                    )}
                    <br/>
                    <button className='button' onClick={handleDiscoverClick}> 🔀 Discover!</button>
            </div>
          </div>
            <div className="banned-container">
              <Banned
                bannedAttributes={bannedAttributes}
                handleUnbanAttributeClick={handleUnbanAttributeClick}
              />
            </div>
            <div className="history-container">
              <History prevImages={prevImages}/>
            </div>
      </div>
  )
              }

export default App;
