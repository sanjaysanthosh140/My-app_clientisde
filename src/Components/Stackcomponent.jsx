import React, { useState, useEffect } from 'react';
import './Stackcomponent.css';

function Stackcomponent({ stack }) {

  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [
          {
            id: 'c1',
            icon: '1',
            title: 'Winter',
            description: 'Winter has so much to offer - creative activities',
            image: './img1.jpeg'
          },
          {
            id: 'c2',
            icon: '2',
            title: 'Digital Technology',
            description: 'Gets better every day - stay tuned',
            image: './img2.jpeg'
          },
          {
            id: 'c3',
            icon: '3',
            title: 'Globalization',
            description: 'Help people all over the world',
            image: './img3.jpeg'
          },
          {
            id: 'c4',
            icon: '4',
            title: 'New technologies',
            description: 'Space engineering becomes more and more advanced',
            image: './img4.jpeg'
          }
        ];
        
        setCards(data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="wrapper">
      <div className="container">
        {cards.map((card, index) => (
          <React.Fragment key={card.id}>
            <input 
              type="radio" 
              name="slide" 
              id={card.id} 
              defaultChecked={index === 0} 
            />
            <label 
              htmlFor={card.id} 
              className="card"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="row">
                <div className="icon">{card.icon}</div>
                <div className="description">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Stackcomponent;
