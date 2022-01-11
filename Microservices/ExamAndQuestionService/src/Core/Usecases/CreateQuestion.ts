import {Request, Response} from "express";
import QuestionRepo from "../../Infrastructures/Repositories/QuestionRepository";

import {QuestionModel} from "../../Infrastructures/Mongo-Model/questionModel";
import {ResponseI} from "../Model/ResponseModel/Response";


export default async (req: Request, questionRepo: QuestionRepo) => {

    try {
        const addQuestion = new QuestionModel({
            questionsCategory: req.body.questionsCategory,
            questionsDifficultyRate: req.body.questionsDifficultyRate,
            questionLikeRate: req.body.questionLikeRate,
            question: {
                questionContent: req.body.question.questionContent,
                questionOptions: {
                    A: req.body.question.questionOptions.A,
                    B: req.body.question.questionOptions.B,
                    C: req.body.question.questionOptions.C,
                    D: req.body.question.questionOptions.D,
                    E: req.body.question.questionOptions.E
                },
                questionSolution:req.body.question.questionSolution,
                questionAnswer:req.body.question.questionAnswer

            }

        })
        const dbResponse = await questionRepo.create(addQuestion)
        const responseDto: ResponseI<null | undefined> = {
            data: null,
            message: dbResponse,
            status: "200"
        }
        return responseDto
    }catch (err){
        const responseDto: ResponseI<null | undefined> = {
            data: null,
            message: `${err}`,
            status: "400"
        }
        return responseDto
    }




}