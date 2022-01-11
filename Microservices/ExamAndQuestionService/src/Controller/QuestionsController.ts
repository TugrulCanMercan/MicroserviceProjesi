import createQuestionsUsecases from "../Core/Usecases/CreateQuestion";
import amqpClient from "../Infrastructures/Db-access/rabbitmqConnect";

import questionRepository from "../Infrastructures/Repositories/QuestionRepository";
import {Request} from "express";
import getQuestionUsecase from "../Core/Usecases/getQuestionUsecase";


export default class QuestionsController {

    constructor(
        private readonly questionRepo: questionRepository
    ) {
    }

    async createQuestions(req: Request) {
        const response = await createQuestionsUsecases(req, this.questionRepo)
        return response
    }

    async questionAddLibrary(req:Request){
        const question = await getQuestionUsecase(req,this.questionRepo)
        return new Promise((resolve,reject)=>{
            if (question.data != null){
                amqpClient.then(function(conn) {
                    return conn.createChannel();
                }).then(function(ch) {
                    const QUEUE = "UserQuestionEvent"
                    return ch.assertQueue(QUEUE).then(function(ok) {
                        const sendData = {
                            //burası değişecek
                            UUID:req.body.UUID,
                            QuestionId:question.data?._id
                        }
                        ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(sendData)));
                        resolve("Göderiliyor")
                    });
                }).catch(console.warn);
            }
        })


    }

}