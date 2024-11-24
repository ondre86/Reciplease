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
                // "cloud.umami.is",
            ],
            connectSrc: [
                "'self'",
                // "https://api-gateway.umami.dev/api/send",
                // "challenges.cloudflare.com"
            ],
            frameSrc: [
                "'self'",
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
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)

    let clientRequest = JSON.parse(req.body)

    clientRequest.client.location.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    await fetch(`http://ip-api.com/json/${clientRequest.client.location.ip.slice(7)}`)
    .then(resp => {clientRequest.client.location.location = resp.body})

    let query = ''
    let spoonacularQuery = ''
    let spoonacularNumber = 'number=100'

    switch (clientRequest.request.mode) {
        case 'pantry':
            clientRequest.request.message.forEach(term => {
                spoonacularQuery += `${term},+`
                query += `"${term}"` + '+'
            })
            query = `recipes+with+` + query.slice(0, query.length-1)
            spoonacularQuery = spoonacularQuery.slice(0, spoonacularQuery.length-2)

            break
    
        case 'recipe':
            query = `${clientRequest.request.message[0]}+recipes`
            break
        case 'extractor':
            query = clientRequest.request.message[0]
    }

    console.log(query)
    console.log(spoonacularQuery)

    // search = await fetch(`https://api.search.brave.com/res/v1/web/search?q${query}`, {
    //     headers: {
    //         "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY
    //     }
    // })

    // console.log(search)

    res.send(
        JSON.stringify(clientRequest)
    )
}
