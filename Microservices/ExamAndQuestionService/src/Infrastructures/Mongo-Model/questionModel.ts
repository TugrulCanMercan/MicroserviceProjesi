import mongoDb, {Schema} from "mongoose";
import {QuestionI, QuestionModelI, QuestionOptionsI} from "../../Core/Model/RequestModel/QuestionModel";



const QuestionSchema = new Schema<QuestionModelI>({
    questionsCategory: {type:String,required:true},
    questionsDifficultyRate: {type:Number,min:1,max:10,message:"Lütfen 1-10 arasında değer girin"},
    questionLikeRate: Number,
    question: {
        questionContent:{type:String,required:true},
        questionOptions: {
            A: String,
            B: String,
            C: String,
            D: String,
            E: String
        },
        questionSolution:{type:String,default:""},
        questionAnswer: {type:String,required:true},
    }
})
const QuestionModel = mongoDb.model<QuestionModelI>("Questions",QuestionSchema,"QuestionCollection")
export {QuestionSchema,QuestionModel}