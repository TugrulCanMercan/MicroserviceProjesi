import {Request} from "express";



export default interface QuestionControllerI{
    createQuestions(req:Request):void
    getQuestion(req:Request):void
}