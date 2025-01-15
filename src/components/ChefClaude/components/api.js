import { Anthropic } from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You do not need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they did not mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`;

// verify api key is available
const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
if (!API_KEY) {
    console.error("No API Key found...");    
}

const anthropic = new Anthropic({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr) {
    // add a try/catch?
    const ingredientsString = ingredientsArr.join(", ");
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
            { 
                role: "user", 
                content: `I have ${ingredientsString}. Please give me a recipe you would recommend I make!`
            }
        ],
        system: SYSTEM_PROMPT
    });
    // console.log(msg);
    return msg.content[0].text;
}

