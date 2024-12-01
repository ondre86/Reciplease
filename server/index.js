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
                'localhost:5173',
                // "cloud.umami.is",
            ],
            connectSrc: [
                "'self'",
                '192.168.1.118:5173',
                'localhost:5173',
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

app.use('/', (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

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
    let clientRequest = JSON.parse(req.body)

    console.log(req.socket.remoteAddress)

    // clientRequest.client.location.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // await fetch(`http://ip-api.com/json/${clientRequest.client.location.ip}`)
    // .then(resp => {
    //     console.log(resp)
    //     clientRequest.client.location.location = resp.body
    // })

    let searchQuery = ''
    let braveURL = ''
    let spoonacularQuery = ''
    let spoonacularURL = ''
    let extractorURL = ''
    let scraper

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

            break
    }


    // await fetch(extractorURL, {
    //     method: 'GET',
    //     headers: {
    //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0',
    //         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
    //     }
    // })
    // .then(response => response.text())
    // .then(data =>{
    //     let $ = cheerio.load(data)
    //     let $ingredients = $('ul[class*="ingredients"]').contents()

    //     // for(let item of $ingredients){
    //     //     console.log(item.children)
    //     // }

    //     console.log($ingredients)
    //     // console.log(data)
    // })


    
    // scraper.extract({
    //     ingredients:
    //         {
    //             selector: 'ul[class*="ingredients"]',
    //             value: {
    //                 list: ['li'],
    //             },
    //         },
    // })

    // console.log(scrapedRecipeInformation)
    // scrapedRecipeInformation.ingredients.list.forEach(item => {
    //     console.log(item)
    // })

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
