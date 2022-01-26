import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document{
    name:string
    surname:string
    password:string
    email:string
    userQuestionLibrary:string[]
    userExamLibrary:string[]
}