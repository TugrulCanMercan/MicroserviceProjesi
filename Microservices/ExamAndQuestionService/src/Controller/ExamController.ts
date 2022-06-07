import {Request} from "express";
import createExamUsecase from "../Core/Usecases/CreateExamUsecase";
import ExamRepository from "../Infrastructures/Repositories/ExamRepository";
import amqp from "amqplib/callback_api";
import amqpClient from "../Infrastructures/Db-access/rabbitmqConnect";

import {ResponseI} from "../Core/Model/ResponseModel/Response";
import {ExamModelI} from "../Core/Model/RequestModel/ExamModel";
import {connection} from "mongoose";


export default class ExamController {
    constructor(
        private readonly examRepo: ExamRepository
    ) {
    }

    async createExam(req: Request) {
        const createInfo = await createExamUsecase(req, this.examRepo)

        return new Promise<string>((resolve, reject)=>{
            if (typeof createInfo === "string") {
                resolve(createInfo)
            } else {
                amqpClient().then((connection)=>{
                    connection.createChannel((err, channel)=>{
                        if(err){
                            throw err
                        }

                        const QUEUE = "UserAddExamQueue"
                        channel.assertQueue(QUEUE)
                        channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify({ExamId:createInfo._id,UUID:req.body.UUID.sub})))
                        resolve("Kayıt Başarılı")
                    })
                    setInterval(()=>{
                        connection.close()
                    },500)
                })

            }
        })

    }

    async createAddExam(req: Request) {
    }
}