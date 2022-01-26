import {Request} from "express";
import QuestionRepo from "../../Infrastructures/Repositories/QuestionRepository";
import {ResponseI} from "../Model/ResponseModel/Response";
import {QuestionModelI} from "../Model/RequestModel/QuestionModel";

export default async (id:string, questionRepo: QuestionRepo)=>{
    try {

        const dbResponse = await questionRepo.findOne(id)
        return dbResponse
        // const responseDto: ResponseI<QuestionModelI> = {
        //     data: dbResponse,
        //     message: "İşlem Başarılı",
        //     status: "200"
        // }
        // return responseDto
    }catch (err){
        // const responseDto: ResponseI<null | undefined> = {
        //     data: null,
        //     message: `${err}`,
        //     status: "400"
        // }
        // return responseDto
    }


}