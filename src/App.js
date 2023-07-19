import React, { useState } from 'react';
import './App.css';
import ChestOpening from './chestOpen/chestOpen';
import ChestList from './chestList/ChestList';
import FooterBox from './FooterBox/FooterBox';
import { chestsMainImg } from './chestsData/chestData';

function App(props) {
  document.title = "Эмулятор лудомана L2 Essence";
 

  const [selectedChest, setSelectedChest] = useState(null);

  const handleChestSelect = (chestName) => {
    setSelectedChest(chestName);
  };

  return (
    <>
      <ChestList chests={chestsMainImg}  onChestSelect={handleChestSelect} />
      <ChestOpening selectedChest={selectedChest} />
      <FooterBox/> 
    </>
  );
}

export default App;
