import mongoDb, {Schema} from "mongoose";
import {ExamModelI} from "../../Core/Model/RequestModel/ExamModel";
import {v4 as uuidv4} from "uuid";
import {QuestionI, QuestionModelI} from "../../Core/Model/RequestModel/QuestionModel";
import {ExamResultModelI} from "../../Core/Model/RequestModel/ExamResultModel";
import {QuestionModel, QuestionSchema} from "./questionModel";

// examTitle:string
// examSendDate?:Date
// examAnswer:string
// questionsCategory: {type:String},
// questionsDifficultyRate: {type:Number,min:1,max:10,message:"Lütfen 1-10 arasında değer girin"},
// questionLikeRate: Number,
//     question: {
//     questionContent:{type:String,required:true},
//     questionOptions: {
//         A: String,
//             B: String,
//             C: String,
//             D: String,
//             E: String
//     },
//     questionSolution:{type:String,default:""},
//     questionAnswer: {type:String,required:true},
// }
const ExamResultSchema = new Schema<ExamResultModelI>({
    _id: { type: String, default: () => uuidv4()},
    examId: {type: String},
    examTitle: {type: String, required: true},
    examQuestions: [QuestionSchema]
})

// examQuestions: {type: [QuestionSchema], validate: examCountValidation}
function minuteFromNow() {
    const timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60 * 5);
    return timeObject;
};

function examCountValidation(value: QuestionModelI[]) {
    // `this` is the mongoose document
    if (value.length >= 3) {
        return true
    } else {
        throw new Error(`lütfen ${3 - value.length} adet daha soru giriniz`)
    }
}


const ExamResultModel = mongoDb.model<ExamResultModelI>("ExamsResult", ExamResultSchema, "ExamResultCollection")
export default ExamResultModel