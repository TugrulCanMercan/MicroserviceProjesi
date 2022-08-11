import {Request} from "express";
import ExamRepository from "../../Infrastructures/Repositories/ExamRepository";
import ExamResultModel from "../../Infrastructures/Mongo-Model/examModel";

export default async (req: Request, examRepo: ExamRepository)=>{
    try{
        const createExam = new ExamResultModel({
            _id:req.body.UUID,
            examTitle: req.body.examTitle,
            examCategory: req.body.examCategory,
            examStartTime: req.body.examStartTime,
            examEndTime: req.body.examEndTime,
            examQuestions: req.body.examQuestions,
            examTotalPoint: req.body.examTotalPoint
        })
        const dbResponse = await examRepo.create(createExam)
        return dbResponse

    }catch (err){
        return `hata : ${err}`

    }
}