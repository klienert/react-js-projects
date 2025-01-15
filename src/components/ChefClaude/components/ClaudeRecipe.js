import ReactMarkdown from 'react-markdown';

const ClaudeRecipe = ({ recipe }) => {
   
    return (
        <section className='suggested-recipe-container' aria-live="polite">
            <h1>Chef Claude Recommends:</h1>
            <ReactMarkdown>
                {recipe}
            </ReactMarkdown>
        </section>
    )
}

export default ClaudeRecipe;