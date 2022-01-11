import createUserUsecase from "../Core/Usecases/CreateUserusecase";
import {UserRepository} from "../Infrastructures/Repository/UserRepository";
import {Request} from "express";
import {IQuestionEvent} from "../Core/Interface/IQuestionEvent";



export default class UserController {
    constructor(
        private readonly userRepo: UserRepository,
    ) {

    }

    async createNewUser(req:Request){
        return await createUserUsecase(req,this.userRepo)
    }
    addLibraryConsumer(ReceiveData:IQuestionEvent){
        this.userRepo.addQuestionLibrary(ReceiveData.UUID,ReceiveData.QuestionId)

    }
}
