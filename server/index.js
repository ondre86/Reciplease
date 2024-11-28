import express from "express"
import helmet from "helmet"
import * as cheerio from "cheerio"
import OpenAI from "openai"

const app = express()

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: [
                "'self'", 
                '192.168.1.118:5173',
                // "cloud.umami.is",
            ],
            connectSrc: [
                "'self'",
                '192.168.1.118:5173',
                "api.spoonacular.com",
                "api.search.brave.com",
                process.env.CLIENT_URL,
                // "https://api-gateway.umami.dev/api/send",
                // "challenges.cloudflare.com"
            ],
            frameSrc: [
                "'self'",
                '192.168.1.118:5173',
                // "challenges.cloudflare.com"
            ]
        }
    }
}))

app.use(express.json()).use(express.text())

app.post('/', (req, res)=>{
    sendResponse(req, res)
})

app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
)

async function sendResponse(req, res){
    // res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)

    let clientRequest = JSON.parse(req.body)

    // console.log(req.socket.remoteAddress)

    // clientRequest.client.location.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // await fetch(`http://ip-api.com/json/${clientRequest.client.location.ip.slice(7)}`)
    // .then(resp => {clientRequest.client.location.location = resp.body})

    let searchQuery = ''
    let braveURL = ''
    let spoonacularQuery = ''
    let spoonacularURL = ''
    let extractorURL = ''
    let scraper = ''

    switch (clientRequest.request.mode) {
        case 'pantry':
            clientRequest.request.message.forEach(term => {
                spoonacularQuery += `${term},+`
                searchQuery += `"${term}"` + '+'
            })
            searchQuery = `recipes+with+` + searchQuery.slice(0, searchQuery.length-1)
            braveURL = `https://api.search.brave.com/res/v1/web/search?q=${searchQuery}`
            spoonacularQuery = spoonacularQuery.slice(0, spoonacularQuery.length-2)
            spoonacularURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${spoonacularQuery}&number=20`

            break
    
        case 'recipe':
            searchQuery = `${clientRequest.request.message[0]}+recipes`
            braveURL = `https://api.search.brave.com/res/v1/web/search?q=${searchQuery}`
            spoonacularQuery = clientRequest.request.message[0]
            spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?query=${spoonacularQuery}&addRecipeInstructions&fillIngredients&number=20`

            break
        case 'extractor':
            searchQuery = clientRequest.request.message[0]
            spoonacularURL = `https://api.spoonacular.com/recipes/extract?url=${searchQuery}`
            extractorURL = searchQuery.includes('https://') ? searchQuery : 'https://' + searchQuery

            scrapeURL(extractorURL)
            // scraper = await cheerio.fromURL(searchQuery)

            break
    }


    // console.log(scraper.extract({
    //     releases: [
    //         {
    //           // First, we select individual release sections.
    //           selector: 'section',
    //           // Then, we extract the release date, name, and notes from each section.
    //           value: {
    //             // Selectors are executed within the context of the selected element.
    //             name: 'h2',
    //             date: {
    //               selector: 'relative-time',
    //               // The actual release date is stored in the `datetime` attribute.
    //               value: 'datetime',
    //             },
    //             notes: {
    //               selector: '.markdown-body',
    //               // We are looking for the HTML content of the element.
    //               value: 'innerHTML',
    //             },
    //           },
    //         },
    //       ],
    // }))

    // braveSearch = await fetch(`https://api.search.brave.com/res/v1/web/search?q${searchQuery}`, {
    //     headers: {
    //         "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY
    //     }
    // })
    // spoonSearch = await fetch(``, {
    //     headers: {
    //         "x-api-key": process.env.SPOONACULAR_API_KEY
    //     }
    // })

    // console.log(search)

    res.send(
        JSON.stringify(clientRequest)
    )
}
