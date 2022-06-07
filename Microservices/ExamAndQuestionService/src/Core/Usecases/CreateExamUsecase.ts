
import {Request} from "express";
import ExamModel from "../../Infrastructures/Mongo-Model/examModel";
import ExamRepository from "../../Infrastructures/Repositories/ExamRepository";
import {ResponseI} from "../Model/ResponseModel/Response";

export default async (req: Request, examRepo: ExamRepository) => {
    try{
        const createExam = new ExamModel({
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
        // const responseDto: ResponseI<null | undefined> = {
        //     data: null,
        //     message: dbResponse,
        //     status: "200"
        // }
        // return responseDto
    }catch (err){
        return `hata : ${err}`
        // const responseDto: ResponseI<null | undefined> = {
        //     data: null,
        //     message: `${err}`,
        //     status: "400"
        // }
        // return responseDto
    }
};
