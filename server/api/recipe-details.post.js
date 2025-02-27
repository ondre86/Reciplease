import OpenAI from "openai"
import detailedOpenAIResponseFormat from '~/server/api/detailedResponseSchema.json' assert {type: 'json'}

export default defineEventHandler(async (event)=>{
    const clientRequest = await readBody(event)
    const config = useRuntimeConfig()

    if (!clientRequest.client.user.auth.stsTokenManager.accessToken || clientRequest.client.user.auth.stsTokenManager.expirationTime < Date.now()) {
        throw new Error("Expired or Missing Auth")
    }

    const openai = new OpenAI({apiKey: config.openAIKey})
    const recipeSearchDirection = `
        You are a helpful assistant with decades of culinary experience and expert cooking knowledge here to provide delicious recipes based on users' queries. 
        You should utilize spellcheck to help users match with their intended queries.
        If a provided ingredient does not match a known food ingredient, try your best to build a recipe from any of the remaining valid ingredients you have been provided.
        If you are provided with no valid food ingredients, "isValidRequest" should be false.
        If you cannot generate any recipes from the provided recipe name, "isValidRequest" should be false.
        Recipe responses should strive to be authentic and interesting. Trendy recipes are welcome.
        If asked for a random recipe, provide a recipe from a different culture that uses different ingredients than the previous random recipe request.
    `

    let openAISearchQuery = ''
    let openAIPrompt = ''
    let completion
    let imageSearchResult

    if (clientRequest.request.mode == 'random') {
        openAISearchQuery = 'random recipe'
        openAIPrompt = `Provide me with a random recipe containing ingredients that are relatively easy to procure within the United States. It does not have to be a simple dish.`
    }
    else {
        openAIPrompt = `Provide me a recipe for ${clientRequest.request.message}`
    }

    completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            { 
                role: "system", 
                content: recipeSearchDirection
            },
            {
                role: "user",
                content: openAIPrompt,
            },
        ],
        response_format: detailedOpenAIResponseFormat
    })

    let randomRecipe = clientRequest.request.mode == 'random' ? JSON.parse(completion.choices[0].message.content).recipes[0].recipeName : null
    let braveImageSearchURL = clientRequest.request.mode == "random" && randomRecipe ? `https://api.search.brave.com/res/v1/images/search?q=${encodeURIComponent(randomRecipe + ' recipe')}&count=1` : `https://api.search.brave.com/res/v1/images/search?q=${encodeURIComponent(clientRequest.request.message + ' recipe')}&count=1`

    try {
        const response = await fetch(braveImageSearchURL, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
            "X-Subscription-Token": config.braveSearchKey,
        },
        });
    
        if (!response.ok) {
            imageSearchResult = {
                results: [
                    {
                        thumbnail:{
                            src: '/placeholder.png'
                        }
                    }
                ]
            }
        }
        else {
            imageSearchResult = await response.json()
        }
    } 
    catch (error) {
        console.error("Error with Brave Image Search API:", error);
    }
    

    clientRequest.generation = {
        query: openAIPrompt,
        response: completion.choices[0].message,
        image: imageSearchResult
    }

    return clientRequest

})