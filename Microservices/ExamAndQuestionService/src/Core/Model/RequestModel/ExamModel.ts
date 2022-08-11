import {QuestionModelI} from "./QuestionModel";
import mongoose from "mongoose";

export interface ExamModelI extends mongoose.Document{
    userId:string
    examTitle:string
    examCategory:string
    examStartTime:Date
    examEndTime:Date
    examQuestions:QuestionModelI[]
    examTotalPoint:number
}