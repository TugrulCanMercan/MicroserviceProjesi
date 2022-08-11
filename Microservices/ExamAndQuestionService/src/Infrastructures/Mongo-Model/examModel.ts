import mongoDb, {Schema} from "mongoose";
import {ExamModelI} from "../../Core/Model/RequestModel/ExamModel";
import {QuestionSchema} from "./questionModel";
import {QuestionModelI} from "../../Core/Model/RequestModel/QuestionModel";
import { v4 as uuidv4 } from 'uuid';

const ExamSchema = new Schema<ExamModelI>({
    _id: { type: String, default: () => uuidv4()},
    userId:{type:String,default:""},
    examTitle: {type: String, required: true},
    examCategory: {type: String},
    // @ts-ignore
    examStartTime: {
        type: Date, default: Date.now, validate: {
            validator: function (v: any) {
                return (
                    v && // check that there is a date object
                    v.getTime() > Date.now() - 5000

                )
            },
            message: "geçersiz zaman aralığı"
        }
    },
    // @ts-ignore
    examEndTime: {
        type: Date, default: minuteFromNow, validate: {
            // @ts-ignore
            validator: function (v: any) {
                return (
                    // @ts-ignore
                    this.examStartTime < v
                )

            },
            message: "geçersiz son zaman"
        }
    },
    examQuestions: {type: [{type:String,ref:'Questions'}], validate: examCountValidation},
    examTotalPoint: {type: Number, min: 0, max: 100, message: "Geçersiz puan girildi"}
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


const ExamModel = mongoDb.model<ExamModelI>("Exams", ExamSchema, "ExamCollection")
export default ExamModel