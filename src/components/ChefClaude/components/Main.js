import React, { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromChefClaude} from "./api";

const Main = () => {

    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");    

    const addIngredients = (formData) => {
        const newIng = formData.get("ingredient");
        setIngredients(prevIng => [...prevIng, newIng]);
    }

    const handleGetRecipe = async () => {
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
        setRecipe(recipeMarkdown);
    }

    return (
        <section className="chef-claude-main">
            <form 
                className="add-ingredient-form"
                action={addIngredients}
            >
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList 
                    ing={ingredients} 
                    showRecipe={handleGetRecipe}
                />
            }
            
            {recipe && <ClaudeRecipe recipe={recipe}/> }
            
        </section>
    )
}

export default Main