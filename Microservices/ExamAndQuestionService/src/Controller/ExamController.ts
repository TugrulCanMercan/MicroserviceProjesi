import {Request} from "express";
import createExamUsecase from "../Core/Usecases/CreateExamUsecase";
import ExamRepository from "../Infrastructures/Repositories/ExamRepository";
import {ResponseI} from "../Core/Model/ResponseModel/Response";


export default class ExamController {
    constructor(
        private readonly examRepo: ExamRepository
    ) {
    }

    async createExam(req: Request) {
        const createInfo = await createExamUsecase(req, this.examRepo)
        return createInfo
    }
}