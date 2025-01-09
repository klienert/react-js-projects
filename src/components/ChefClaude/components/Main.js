import React from "react";

const Main = () => {

    return (
        <section className="chef-claude-main">
            <form className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                />
                <button>Add ingredient</button>
            </form>
        </section>
    )
}

export default Main