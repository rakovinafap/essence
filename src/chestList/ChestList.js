import React, { Component } from 'react';
import './chestList.css';



class ChestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChest: null,
    };
  }

  handleChestClick = (chestName) => {
    this.setState({ selectedChest: chestName });
    console.log (chestName)
    
  };

  


  render() {
    const { chests, onChestSelect } = this.props;
    const { selectedChest } = this.state;

    return (
        <div className="chest-list">
        {chests.map((chest, index) => (
          <div
          key={index}
          className={`${chest.name === selectedChest ? 'chest-list-boxes-selected' : 'chest-list-boxes'}`}
          onClick={() => {
            this.handleChestClick(chest.name);
            onChestSelect(chest.name); // Вызов колбэка для передачи значения selectedChest
          }}
        >
            <img className="selectedBox" src={chest.image} alt={chest.name} />
            <p>{chest.item}</p>
          </div>
        ))}
       
      </div>
      
    );
  }
}

export default ChestList;
