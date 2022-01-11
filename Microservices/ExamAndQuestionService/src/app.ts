import express from "express";
import {routerModule} from "./RouterModule";
import dbConnection from "./Infrastructures/Db-access/db-connection";
import amqp from "./Infrastructures/Db-access/rabbitmqConnect";

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5002
app.use(routerModule())


app.listen(PORT,()=>{
    
    dbConnection()
    console.log(`Dinlenen port : ${PORT} `)
})