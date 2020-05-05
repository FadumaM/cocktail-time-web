import React from "react";
import "./styles.css";

const Cocktail = ({ cocktail }) =>
  cocktail && Object.entries(cocktail).length > 0 ? (
    <div className="cocktail-container">
      <div className="cocktail-image">
        <img src={cocktail.image} alt={cocktail.name} />
      </div>
      <div className="cocktail-details">
        <h1>{cocktail.name}</h1>
        <div className="cocktail-instruction">
          <h2>Instruction</h2>
          <p>{cocktail.instruction}</p>
        </div>
        <div className="cocktail-ingredients">
          <h3>Ingredients</h3>
          <ol className="ingredient">
            {cocktail.ingredients.map(({ amount, name, id }, index) => (
              <li key={index}>
                <span>
                  {amount} {name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  ) : null;

export default Cocktail;
