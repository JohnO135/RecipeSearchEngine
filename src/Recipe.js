import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories,image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <label className={style.label} for="ingredientsList">Ingredients:</label>
            <ol id="ingredientsList" className="ingredients-list">
                {ingredients.map(ingredient =>(<li>{ingredient.text}</li>))}
            </ol>
            <p>Calories: {Number.parseFloat(calories).toFixed(2)}</p>
            <img className={style.image} src={image} alt=""></img>
        </div>
    );
} 

export default Recipe;