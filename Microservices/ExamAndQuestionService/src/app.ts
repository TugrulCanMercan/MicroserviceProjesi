import express from "express";
import {routerModule} from "./RouterModule";
import dbConnection from "./Infrastructures/Db-access/db-connection";
import axios from "axios";

import amqp from "./Infrastructures/Db-access/rabbitmqConnect";

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5002
app.use(routerModule())


app.listen(PORT,()=>{
    
    dbConnection()
    // axios({
    //     method: "POST",
    //     url: "http://apigateway:5001/register",
    //     headers:{'Content-Type':'application/json'},
    //     data:{
    //         apiName:"ExamAndQuestion",
    //         protocol:"http",
    //         host:"examandquestion",
    //         port:PORT,
    //         route:[
    //             "/createExam",
    //             "/getAllQuestions",
    //             "/addQuestions",
    //             "/questionAddLibrary"
    //         ]
    //     }
    // }).then((result)=>{
    //     console.log(result.data)
    // })
    console.log(`Dinlenen port : ${PORT} `)
})