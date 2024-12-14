import OpenAI from "openai"
import detailedOpenAIResponseFormat from '~/server/api/detailedResponseSchema.json' assert {type: 'json'}

export default defineEventHandler(async (event)=>{
    const clientRequest = await readBody(event)
    const config = useRuntimeConfig()

    const openai = new OpenAI({apiKey: config.openAIKey})
    const recipeSearchDirection = `
        You are a helpful assistant with decades of culinary experience and expert cooking knowledge here to provide delicious recipes based on users' queries. 
        You should utilize spellcheck to help users match with their intended queries.
        If a provided ingredient does not match a known food ingredient, try your best to build a recipe from any of the remaining valid ingredients you have been provided.
        If you are provided with no valid food ingredients, "isValidRequest" should be false.
        If you cannot generate any recipes from the provided recipe name, "isValidRequest" should be false.
        Recipe responses should strive to be authentic and interesting. Trendy recipes are welcome.
    `

    let openAISearchQuery = ''
    let openAIPrompt = ''
    let completion
    let braveImageSearchURL = `https://api.search.brave.com/res/v1/images/search?q=${clientRequest.request.message}`
    let imageSearchResult

    if (clientRequest.request.mode == 'random') {
        openAISearchQuery = 'random recipe'
        openAIPrompt = `Provide me with a random recipe that contains ingredients I would be able to easily procure within the United States. It does not have to be a simple dish.`
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

    await fetch(braveImageSearchURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Accept-Encoding": 'gzip',
            "X-Subscription-Token": config.braveSearchKey
        }
    })
    .then((res)=>{
        console.log(res)
        // res.json()
    })
    // .then((json)=>{
    //     imageSearchResult = json
    // })
    

    clientRequest.generation = {
        query: openAIPrompt,
        response: completion.choices[0].message,
        image: imageSearchResult
    }

    return clientRequest

})