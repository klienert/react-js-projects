import React, { useState } from "react";

const IngredientsList = ( { ing, showRecipe, ref}) => {
    
    const ingredientListItems = ing.map(x => (
        <li key={x}>{x}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientListItems}</ul>
            {ingredientListItems.length > 3 && 
                <div className="get-recipe-container">
                    <div
                        ref={ref}
                    >
                        <h3>Ready for a Recipe?</h3>
                        <p>Generate a recipe from yoru list of ingredients.</p>
                    </div>
                    <button
                        onClick={showRecipe}
                    >Get a Recipe</button>
                </div>
            }
        </section>
    )
}

export default IngredientsList;