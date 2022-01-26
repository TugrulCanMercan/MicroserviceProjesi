import createQuestionsUsecases from "../Core/Usecases/CreateQuestion";
import amqpClient from "../Infrastructures/Db-access/rabbitmqConnect";

import questionRepository from "../Infrastructures/Repositories/QuestionRepository";
import {Request} from "express";
import getQuestionUsecase from "../Core/Usecases/getQuestionUsecase";
import {QuestionModelI} from "../Core/Model/RequestModel/QuestionModel";
import {ResponseI} from "../Core/Model/ResponseModel/Response";


export default class QuestionsController {

    constructor(
        private readonly questionRepo: questionRepository
    ) {
    }

    async createQuestions(req: Request) {
        const question = await createQuestionsUsecases(req, this.questionRepo)
        if (typeof question === "string") {
            const response: ResponseI<string> = {
                data: undefined
                , message: "Kayıt başarısız",
                status: "400"
            }
            return response
        } else {
            const response: ResponseI<QuestionModelI> = {
                data: question
                , message: "Kayıt başarılı",
                status: "200"
            }
            return response
        }
    }

    async getAllQuestions(req: Request) {
        const allQuestionId = req.body.userQuestionLibrary
        const allQuestion: QuestionModelI[] = await this.questionRepo.find({_id: {$in: allQuestionId}})
        return allQuestion
    }

    async questionAddLibrary(req: Request) {
        const question = await getQuestionUsecase(req.body.QuestionId, this.questionRepo)

        return new Promise<string>((resolve, reject) => {
            if (question != null) {

                amqpClient().then((connection)=>{
                    connection.createChannel((err,channel)=>{
                        if(err){
                            reject(`Hata:${err}`)
                        }
                        const QUEUE = "UserQuestionEvent"
                        channel.assertQueue(QUEUE)
                        channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify({UUID:req.body.UUID.sub,QuestionId:req.body.QuestionId})))
                       resolve("başarılı")
                    })
                    setInterval(()=>{
                        connection.close()
                    },500)
                })
            }
        })


    }

}