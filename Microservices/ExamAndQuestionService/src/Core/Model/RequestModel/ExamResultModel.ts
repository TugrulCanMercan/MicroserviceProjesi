
import {QuestionI, QuestionModelI} from "./QuestionModel";
import mongoose from "mongoose";

export interface ExamResultModelI extends mongoose.Document{
    examId:string
    examTitle:string
    examSendDate?:Date
    examQuestions:QuestionModelI
    examAnswer:string
}