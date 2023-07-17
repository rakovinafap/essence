import React, { useState } from 'react';
import './App.css';
import ChestOpening from './chestOpen/chestOpen';
import ChestList from './chestList/ChestList';
import { chestsMainImg } from './chestsData/chestData';

function App(props) {
  const [selectedChest, setSelectedChest] = useState(null);

  const handleChestSelect = (chestName) => {
    setSelectedChest(chestName);
  };

  return (
    <>
      <ChestList chests={chestsMainImg}  onChestSelect={handleChestSelect} />
      <ChestOpening selectedChest={selectedChest} />
    </>
  );
}

export default App;
