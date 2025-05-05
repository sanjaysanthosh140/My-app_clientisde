import React, { useState, useEffect } from "react";
import "./Stackcomponent.css";

function Stackcomponent(stack) {
  const [cards, setCards] = useState([]);
  const staclis = stack.stack;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `http://localhost:4000/admin_side/Get_stack?stack=${staclis}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) =>
          response.json().then((data) => {
            const preve = data.stacks
            setCards(preve);
          })
        );
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
  <div className="container">
    {cards.map((card, index) => (
      <React.Fragment key={card.id || index}>
        <input
          type="radio"
          name="slide"
          id={`card-${index}`}
          defaultChecked={index === 0}
        />
        <label
          htmlFor={`card-${index}`}
          className="card"
          style={{
            backgroundImage: `url(http://localhost:4000/uploads/${card.image})`
          }}
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
