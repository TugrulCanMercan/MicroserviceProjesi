import BaseRepository from "./BaseRepository";
import {IUserModel} from "../../Core/Model/IUserModel";


export class UserRepository extends BaseRepository<IUserModel> {

    async addUser(user: IUserModel) {

        const result = await this.find({email: user.email})
        if (result.length == 0) {
            return await this.create(user)
        } else {
            return "Kullanıcı zaten var"
        }

    }

    async addQuestionLibrary(id: string, item: string) {
        const user = await this.findOne(id)
        if (user.userQuestionLibrary.length == 0){
            this._model.findByIdAndUpdate(id,{$push: {userQuestionLibrary: item}}).catch((err)=>{
                console.log(err)
            })
            return "Başarıyla eklendi"
        }else{
            const result = user.userQuestionLibrary.find((val)=>{
                return  val == item
            })
            if(result == undefined){
                this._model.findByIdAndUpdate(id,{$push: {userQuestionLibrary: item}}).catch((err)=>{
                    console.log(err)
                })
                return "Başarıyla eklendi"
            }else{
                return "Zaten Listedek ekli"
            }
        }




    }
    async addExamLibrary(id: string, item: string) {
        const user = await this.findOne(id)
        if (user.userExamLibrary.length == 0) {
            this._model.findByIdAndUpdate(id, {$push: {userExamLibrary: item}}).catch((err) => {
                console.log(err)
            })
            return "Başarıyla eklendi"
        } else {
            const result = user.userExamLibrary.find((val) => {
                return val == item
            })
            if (result == undefined) {
                this._model.findByIdAndUpdate(id, {$push: {userExamLibrary: item}}).catch((err) => {
                    console.log(err)
                })
                return "Başarıyla eklendi"
            } else {
                return "Zaten Listedek ekli"
            }
        }
    }
}