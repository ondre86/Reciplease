import OpenAI from "openai"
import detailedOpenAIResponseFormat from '~/server/api/detailedResponseSchema.json' assert {type: 'json'}
import simpleOpenAIResponseFormat from '~/server/api/simpleResponseSchema.json' assert {type: 'json'}

const config = useRuntimeConfig()

const openai = new OpenAI( {apiKey: config.openAIKey})
const recipeSearchDirection = `
    You are a helpful assistant with decades of culinary experience and expert cooking knowledge here to provide delicious recipes based on users' queries. 
    You should utilize spellcheck to help users match with their intended queries.
    If a provided ingredient does not match a known food ingredient, try your best to build a recipe from any of the remaining valid ingredients you have been provided.
    If you are provided with no valid food ingredients, "isValidRequest" should be false.
    If you cannot generate any recipes from the provided recipe name, "isValidRequest" should be false.
    Recipe responses should strive to be authentic and interesting. Trendy recipes are welcome.
`

async function sendRecipeResponse(req, res){
    let clientRequest = JSON.parse(req.body)

    let openAISearchQuery = ''
    let openAIPrompt = ''
    let completion
    let imageSearchQuery = ''
    let braveImageSearchURL = `https://api.search.brave.com/res/v1/images/search?q=${imageSearchQuery}`

    if (clientRequest.request.specificRecipe){

    }

    else {
        switch (clientRequest.request.mode) {
            case 'pantry':
                clientRequest.request.message.forEach(term => {
                    openAISearchQuery += `${term}, `
                })
                openAISearchQuery = openAISearchQuery.slice(0, openAISearchQuery.length-2)
                openAIPrompt = clientRequest.request.responseList.length > 0 ? `Provide me with 5 additional different recipes that contain the following ingredients: ${openAISearchQuery}` : `Provide me with 5 recipes that contain the following ingredients: ${openAISearchQuery}`
                
                break
        
            case 'recipe':
                openAISearchQuery = clientRequest.request.message[0]
                openAIPrompt = clientRequest.request.responseList.length > 0 ? `Provide me with 5 additional different recipes for ${openAISearchQuery}` : `Provide me with 5 recipes for ${openAISearchQuery}`
    
                break
    
            case 'random':
                openAISearchQuery = 'random recipe'
                openAIPrompt = `Provide me with a random recipe that contains ingredients I would be able to easily procure within the United States.`
    
                break
        }
    
        // completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini-2024-07-18",
        //     messages: [
        //         { 
        //             role: "system", 
        //             content: recipeSearchDirection
        //         },
        //         {
        //             role: "user",
        //             content: openAIPrompt,
        //         },
        //     ],
        //     response_format: simpleOpenAIResponseFormat
        // })
    }

    clientRequest.generation = {
        query: openAIPrompt,
        // response: completion.choices[0].message
    }

    res.send(
        JSON.stringify(clientRequest)
    )
}