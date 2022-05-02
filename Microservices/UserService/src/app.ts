import express from "express";
import {routerModule} from "./RouterManager";
import mongoConnection from "./Infrastructures/Connection/MongoDbConnection";
import axios from "axios";


const server = express()
const PORT = process.env.PORT || 5003

server.use(express.json())
server.use(routerModule())



server.listen(PORT, ()=>{
    mongoConnection()
    axios({
        method: "POST",
        url: "http://apigateway:5001/register",
        headers:{'Content-Type':'application/json'},
        data:{
            apiName:"userService",
            protocol:"http",
            host:"userservice",
            port:PORT,
            route:[
                "/register",
                "/userControl",
                "/getUser"
            ]
        }
    }).then((result)=>{
        console.log(result.data)
    })

    console.log(`User Servis ${PORT} portU DİNLENİYOR`)
})