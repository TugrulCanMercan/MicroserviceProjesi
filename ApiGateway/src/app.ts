import express from "express";
import GatewayRouter from "./Router/GatewayRouter";
import 'dotenv/config'


const PORT = process.env.PORT || 5001
const server = express()
server.use(express.json())
server.use('/',GatewayRouter)
server.listen(PORT,()=>{
    console.log(`listening port ${PORT}`)
})
