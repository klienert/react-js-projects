import React, { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromChefClaude} from "./api";
import { behavior } from "@testing-library/user-event/dist/cjs/event/behavior/registry.js";

const Main = () => {

    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");

    const recipeSection = useRef(null); // this is referened in IngredientsList.js
    // console.log(recipeSection);

    useEffect(() => {
        if (recipe !== "" || recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"});
        }
    },[recipe])

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
                    ref={recipeSection}
                />
            }
            
            {recipe && <ClaudeRecipe recipe={recipe}/> }
            
        </section>
    )
}

export default Main