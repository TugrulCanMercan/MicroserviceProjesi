import BaseRepository from "./BaseRepository";
import {IUserModel} from "../../Core/Model/IUserModel";


export class UserRepository extends BaseRepository<IUserModel>{

     async addUser(user:IUserModel){

         const result = await this.find({email:user.email},user)
         if (result.length == 0){
             return await this.create(user)
         }else{
             return "Kullanıcı zaten var"
         }

    }
    addQuestionLibrary(id:string,item:string){

             this._model.updateOne({_id:id},{ $push: { userQuestionLibrary: item }})


    }
}