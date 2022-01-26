import createUserUsecase from "../Core/Usecases/CreateUserusecase";
import {UserRepository} from "../Infrastructures/Repository/UserRepository";
import {Request} from "express";
import {IQuestionEvent} from "../Core/Interface/IQuestionEvent";
import {IExamEvent} from "../Core/Interface/IExamEvent";



export default class UserController {
    constructor(
        private readonly userRepo: UserRepository,
    ) {

    }

    async createNewUser(req:Request){
        return await createUserUsecase(req,this.userRepo)
    }
    async addLibraryQuestionConsumer(ReceiveData:IQuestionEvent){
        try {
            const dbResponse = await this.userRepo.addQuestionLibrary(ReceiveData.UUID,ReceiveData.QuestionId)
            return dbResponse
        }catch (err){
            console.log(err)
        }
    }
    async addLibraryExamConsumer(ReceiveData:IExamEvent){
        try {
            const dbResponse = await this.userRepo.addExamLibrary(ReceiveData.UUID,ReceiveData.ExamId)
            return dbResponse
        }catch (err){
            console.log(err)
        }
    }
    async userLoginCheck(req:Request){
        const user = await this.userRepo.find({email:req.body.email})
        if(user.length == 0){
            return null
        }else {
            return user[0]
        }
    }
    async getUser(req:Request){
        try {
            const user = await this.userRepo.findOne(req.body.UUID.sub)
            return user
        }catch (error){
            return `${error}`
        }


    }

}
