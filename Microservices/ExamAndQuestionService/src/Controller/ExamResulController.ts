import ExamRepository from "../Infrastructures/Repositories/ExamRepository";
import ExamResultRepo from "../Infrastructures/Repositories/ExamResultRepo";
import {Request} from "express";
import ExamResultModel from "../Infrastructures/Mongo-Model/ExamResultModel";
import {v4 as uuidv4} from "uuid";
import {QuestionModel} from "../Infrastructures/Mongo-Model/questionModel";


export default class ExamResultController {
    constructor(
        private readonly examRepo: ExamResultRepo
    ) {
    }

    async sendExamResult(req: Request) {
        try{
            const examResult = new ExamResultModel({
                examId: req.body.examId,
                examTitle: req.body.examTitle,
                examQuestions: req.body.examQuestions

            })
            const cevap = await this.examRepo.create(examResult)
            return cevap
        }catch (e) {
            return e
        }

    }
    getUserExamEntered(req: Request){
        const exam = this.examRepo.find({_id: {$in: req.body.examId}})
    }
}