import React, { useState } from "react";

const Main = () => {

    /**
     * Challenge: clean up our code!
     * Let's make a couple new components to make things a
     * little cleaner. (Notice: I'm not suggesting what we
     * have now is bad or wrong. I'm mostly finding an excuse
     * to get in some hands-on practice 🙂)
     * 
     * 1. Move the entire recipe <section> into its own
     *    ClaudeRecipe component
     * 2. Move the list of ingredients <section> into its
     *    own IngredientsList component.
     * 
     * While you're considering how to structure things, consider
     * where state is, think about if it makes sense or not to
     * move it somewhere else, how you'll communicate between
     * the parent/child components, etc.
     * 
     * The app should function as it currently does when you're
     * done, so there will likely be some extra work to be done
     * beyond what I've listed above.
     */

    const [ingredients, setIngredients] = useState(["ground beef", "tomato", "ginger root", "oregano"]);
    const [recipeShown, setRecipeShown] = useState(false);

    const ingList = ingredients.map((x) => {
        return <li key={x}>{x}</li>
    })

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const formEl = e.currentTarget;
    //     const formData = new FormData(formEl);
    //     const newIng = formData.get('ingredient');
    //     setIngredients(prevIng => [...prevIng, newIng]);
    //     formEl.reset(); // clears the form after submitting
    // }

    const handleGetRecipe = () => {
        // console.log('getRecipe clicked!');set
        setRecipeShown(prevSet => !prevSet);
    }

    const addIngredients = (formData) => {
        const newIng = formData.get("ingredient");
        setIngredients(prevIng => [...prevIng, newIng]);
    }

    const ingredientListItems = ingredients.map(x => (
        <li key={x}>{x}</li>
    ))

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
                <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientListItems}</ul>
                {ingredientListItems.length > 3 && 
                    <div className="get-recipe-container">
                        <div>
                            <h3>Ready for a Recipe?</h3>
                            <p>Generate a recipe from yoru list of ingredients.</p>
                        </div>
                        <button
                            onClick={handleGetRecipe}                            
                        >Get a Recipe</button>
                    </div>
                }
                </section>                
            } {/* end ingredient length conditional */}
            {recipeShown && 
                <section>
                    <h2>Chef Claude Recommends:</h2>
                        <article className="suggested-recipe-container" aria-live="polite">
                            <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                            <h3>Beef Bolognese Pasta</h3>
                            <strong>Ingredients:</strong>
                            <ul>
                                <li>1 lb. ground beef</li>
                                <li>1 onion, diced</li>
                                <li>3 cloves garlic, minced</li>
                                <li>2 tablespoons tomato paste</li>
                                <li>1 (28 oz) can crushed tomatoes</li>
                                <li>1 cup beef broth</li>
                                <li>1 teaspoon dried oregano</li>
                                <li>1 teaspoon dried basil</li>
                                <li>Salt and pepper to taste</li>
                                <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                            </ul>
                            <strong>Instructions:</strong>
                            <ol>
                                <li>Bring a large pot of salted water to a boil for the pasta.</li>
                                <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                                <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                                <li>Stir in the tomato paste and cook for 1 minute.</li>
                                <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                                <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                                <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                                <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                                <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                            </ol>
                        </article>
                </section>
            }
        </section>
    )
}

export default Main