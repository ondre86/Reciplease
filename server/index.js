import express from "express"
import helmet from "helmet"

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

function sendResponse(req, res){
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
    
    res.send({hello: "world"})
}