import OpenAI from "openai"
import shoppingListSchema from '~/server/api/shoppingListSchema.json' assert {type: 'json'}

export default defineEventHandler(async (event)=>{
    const clientRequest = await readBody(event)
    const config = useRuntimeConfig()

    const openai = new OpenAI({apiKey: config.openAIKey})
    const recipeSearchDirection = `
        You are a helpful assistant that outputs shopping lists with price estimates for each item, along with a total price estimate at the end. 
        Do not respond with anything other than a title and the shopping list. 
        Use a colon to separate the price.
        Responses will either be in bullet points or markdown format - bullet points are the default unless specified. 
        If the default option is specified, do not use any markdown formatting such as asterisks, simply use dashes for each list item.
        If markdown format is specified, give each item a checkbox, and do not use a dash before the checkbox.
        If you are provided with a location, get price estimates that match that location, but do not include the location in your response. 
        Item quantities in the JSON objects may be formatted for recipe amounts; translate those amounts into the nearest purchasable item quantity. 
    `

    // GET IP ADDRESS GENERAL LOCATION FOR PRICE ESTIMATES
    const headers = getRequestHeaders(event)
    const forwarded = headers["x-forwarded-for"]?.split(",")[0]
    let ip = forwarded || headers["x-real-ip"] || event.node.req.socket.remoteAddress
    let location = ''
    
    await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${config.ipGeoKey}&ip=${ip}&fields=city`, {
        method: "GET",
        redirect: "follow"
    })
        .then((response) => response.text())
        .then((result) => {
            location = result.city
        })
        .catch((error) => console.error(error))

    

    let openAISearchQuery = ''
    clientRequest.request.message.forEach((item)=>{
        openAISearchQuery += `${item.quantity} ${item.measurement} ${item.name}, `
    })
    openAISearchQuery = openAISearchQuery.slice(0, openAISearchQuery.length-2)

    let listMode = clientRequest.request.mode
    let openAIPrompt = `Create a shopping list for these items: ${openAISearchQuery}. Location: ${location}. Format: ${listMode}`
    let completion

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
        response_format: shoppingListSchema
    })
    

    clientRequest.generation = {
        query: openAIPrompt,
        response: completion.choices[0].message
    }

    return clientRequest

})