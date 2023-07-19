import React, { Component } from 'react';
import {chestsMainImg,  chestOfFullSeals, mystiqueChest, whatTheAghation } from '../chestsData/chestData';
import './styleChest.css';

 const allChests = {
  mystiqueChest: mystiqueChest,
  chestOfFullSeals: chestOfFullSeals,
  whatTheAghation: whatTheAghation,
  
  // Добавьте остальные сундуки здесь
}; 



class ChestOpening extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openedChests: [],
      commonRewards: [],
      rareRewards: [],
      totalChests: 0,
      quantity: 1,
      selectedChest: null,
      selectedChestImage: null,
      selectedChestName: "Выберите сундук",
    };

  }

  

  componentDidUpdate(prevProps) {
    if (prevProps.selectedChest !== this.props.selectedChest) {
      this.setState({ selectedChest: this.props.selectedChest });
      this.setSelectedChestName(this.props.selectedChest);
    }
  }


  findChestByName(selectedChest) {
    if (selectedChest in allChests) {
      return allChests[selectedChest];
    } else {
      return [];
    }
  }  

  
  

  
  getSelectedChestImage() {
    const { selectedChest } = this.state;
    const chest = this.findChestByName(selectedChest);

    if (chest.length > 0) {
      const chestImage = chestsMainImg.find((item) => item.name === selectedChest);
      if (chestImage) {
        return chestImage.image;
      }
    }
    return null;
  }

  setSelectedChestName(selectedChest) {
    const chestImage = chestsMainImg.find((item) => item.name === selectedChest);
    if (chestImage) {
      this.setState({ selectedChestName: chestImage.item });
    }
  }

  
  


  openChests = () => {
    const { selectedChest, quantity } = this.state;
    const { openedChests, commonRewards, rareRewards } = this.state;
    const newOpenedChests = [...openedChests];
    const newCommonRewards = [...commonRewards];
    const newRareRewards = [...rareRewards];
  
    const chest = this.findChestByName(selectedChest);
    const selectedChestImage = this.getSelectedChestImage();
    this.setState({ selectedChestImage });
  
    // Проверяем, есть ли в сундуке предмет с шансом 100%
    const itemWith100PercentChance = chest.find((item) => item.chance === 1);
  
    for (let i = 0; i < quantity; i++) {
      // Если есть предмет с шансом 100%, он всегда выпадает
      if (itemWith100PercentChance) {
        newOpenedChests.push(itemWith100PercentChance.item);
  
        // Добавляем предмет в соответствующий список наград
        if (itemWith100PercentChance.chance >= 0.0006) {
          const existingRewardIndex = newCommonRewards.findIndex((item) => item.item === itemWith100PercentChance.item);
          if (existingRewardIndex !== -1) {
            newCommonRewards[existingRewardIndex].count += 1;
          } else {
            newCommonRewards.push({ item: itemWith100PercentChance.item, count: 1, image: itemWith100PercentChance.img });
          }
        } else {
          const existingRewardIndex = newRareRewards.findIndex((item) => item.item === itemWith100PercentChance.item);
          if (existingRewardIndex !== -1) {
            newRareRewards[existingRewardIndex].count += 1;
          } else {
            newRareRewards.push({ item: itemWith100PercentChance.item, count: 1, image: itemWith100PercentChance.img });
          }
        }
      }
  
      if (!itemWith100PercentChance || i >= 0) {
        const randomNumber = Math.random();
        let cumulativeChance = 0;
        let selectedReward = null;
  
        for (let j = 0; j < chest.length; j++) {
          const reward = chest[j];
          cumulativeChance += parseFloat(reward.chance);
  
          if (randomNumber <= cumulativeChance) {
            newOpenedChests.push(reward.item);
            selectedReward = reward;
            break;
          }
        }
  
        // Добавляем предмет в соответствующий список наград
        if (selectedReward) {
          if (selectedReward.chance >= 0.0006) {
            const existingRewardIndex = newCommonRewards.findIndex((item) => item.item === selectedReward.item);
            if (existingRewardIndex !== -1) {
              newCommonRewards[existingRewardIndex].count += 1;
            } else {
              newCommonRewards.push({ item: selectedReward.item, count: 1, image: selectedReward.img });
            }
          } else {
            const existingRewardIndex = newRareRewards.findIndex((item) => item.item === selectedReward.item);
            if (existingRewardIndex !== -1) {
              newRareRewards[existingRewardIndex].count += 1;
            } else {
              newRareRewards.push({ item: selectedReward.item, count: 1, image: selectedReward.img });
            }
          }
        }
      }
    }
  
    this.setState((prevState) => ({
      openedChests: newOpenedChests,
      commonRewards: newCommonRewards,
      rareRewards: newRareRewards,
      totalChests: prevState.totalChests + quantity,
    }));
  };
  
  
  
    
  
  handleQuantityChange = (e) => {
    this.setState({ quantity: parseInt(e.target.value, 10) });
  };

  removeInventory = () => {
    this.setState({
      commonRewards: [],
      rareRewards: [],
      totalChests: 0
    })
  };

  
  render() {
    const { commonRewards, rareRewards, totalChests, quantity, selectedChest, selectedChestName } = this.state;
    const selectedChestImage = chestsMainImg.find((item) => item.name === selectedChest)?.image;

    const chest = this.findChestByName(selectedChest);
    const arrForInventory = [...commonRewards, ...rareRewards];
    const srcNone = "https://l2central.info/upload/images/icon/event_hero_treasure_box_silver.png";
    

    return (
      <div className="page-container">

        {selectedChest ? (
          <div className="boxListInfo">
          <div className="inBoxListInfo">
            <h4>{selectedChestName}</h4>
            {chest.map((chestInfo, index) => (
              <div key={index}>
                <li>{chestInfo.item} - <span className='spanChance'>{(chestInfo.chance * 100).toFixed(5) + "%"}</span></li> {/* *100 */}
              </div>
            ))}
          </div>
        </div>
        ): null}

      <div className="separator" />
         
        <div className="container">
          <div className="headChest">
            <p className="total-chests text-light">{selectedChestName}</p>
            <img src={selectedChestImage ? selectedChestImage : srcNone} className='ifNoImg' alt="1"/>
            <p className="total-chests text-light">Всего открытых сундуков: {totalChests}</p>
            <input className='inpArea'
              type="number"
              maxLength={5}
              min="1"
              max="500"
              value={quantity}
              onChange={this.handleQuantityChange}
            />
            <button className='inpBut' onClick={() => this.handleQuantityChange({ target: { value: 1 } })}>1</button>
            <button className='inpBut' onClick={() => this.handleQuantityChange({ target: { value: 80 } })}>80</button>
            <button className='inpBut' onClick={() => this.handleQuantityChange({ target: { value: 500 } })}>500</button>
          </div>
          
          {selectedChest ? (
            <div className='buttons'>
              <button className="button-container" disabled={arrForInventory.length > 60 ? true : false} onClick={this.openChests}>
            Открыть сундук
             </button>
             <button className='butRemove' onClick={this.removeInventory}/>
            </div>
          ): null}

          <div className={rareRewards.length > 1 ? 'reward-list-rare-black' : "reward-list-rare"}>
            <h3>Редкие награды:</h3>
            <div className={rareRewards.length > 1 ? 'rare' : null}>
              {rareRewards.map((item, index) => (
                <p key={index} className="text-light">
                  <img src={item.image} align="left" alt=" " />
                   <p> {item.item} <br /> x{item.count}</p>
                </p>
              ))}
            </div>
          </div>

          <div className="reward-list-common">
            <h3>Обычные награды:</h3>
            <div className={commonRewards.length > 4 ? 'common' : null}>
              {commonRewards.map((item, index) => (
                <p key={index} className="text-light">
                  <img src={item.image} align="left" alt=" " />
                  {item.item} <br /> x{item.count}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="separator" />
         
            {selectedChest ? (
              <div className='backpackList'>
              <h4>Инвентарь</h4>
                <div className='inbackpackList'>
                  {arrForInventory.map((item, index) => (
                    <div className='wrapperBackPack'>
                      <img className='imgBackPack' key={index} src={item.image}  alt={item.item} title={item.item} />
                      <p className='counter'>{item.count > 9999 ? "9999+": item.count}</p>
                    </div>
                  ))}</div>
                  {arrForInventory.length > 60 ? (
                    <span>Инвентарь переполнен</span>
                  ): null}
              </div>
            ): null}
          

      </div>
    ); 
  }
}

export default ChestOpening;
