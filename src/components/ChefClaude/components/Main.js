import React, { useState } from "react";

const Main = () => {

    const [ingredients, setIngredients] = useState([]);

    const ingList = ingredients.map((x) => {
        return <li key={x}>{x}</li>
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        const newIng = formData.get('ingredient');
        setIngredients(prevIng => [...prevIng, newIng]);
        formEl.reset(); // clears the form after submitting
    }

    return (
        <section className="chef-claude-main">
            <form 
                className="add-ingredient-form"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ul>
                { ingredients.map((x) => {
                    return <li key={x}>{x}</li>
                }) }
                {/* {ingList} */}
            </ul>
        </section>
    )
}

export default Main