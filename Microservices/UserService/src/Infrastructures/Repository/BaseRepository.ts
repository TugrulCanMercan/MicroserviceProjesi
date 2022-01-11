import mongoose, {Document} from "mongoose";
import {IRead, IRepository, IWrite} from "../../Core/Interface/IRepository";
export default abstract class Repository<T extends mongoose.Document> implements IRepository<T>{

    constructor(
        public _model: mongoose.Model<T>,

    ) {
    }


    async create(item: T):Promise<string>{
        return new Promise((resolve, reject)=>{
            this._model.create(item,(err,res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve("Kayıt Başarılı")
                }
            })
        })
    }



    async delete(id: string): Promise<boolean> {
        return new Promise((resolve,reject)=>{
            this._model.findByIdAndRemove(id,{},(err,doc)=>{
                if (err){
                    console.log(err)
                    reject(err)

                }
                else{
                    console.log("Removed User : ", doc?._id);
                    resolve(true)

                }
            })
        })
    }

    find(query:any,item: T): Promise<T[]> {
        return new Promise((resolve,reject)=>{
            this._model.find(query,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    // @ts-ignore
                    resolve(result)
                }
            })
        })
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            this._model.findById({id:id},{},{},(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    // @ts-ignore
    update(id: string, item: T): Promise<void> {


        return Promise.resolve(undefined);
    }

    getName(): string {
        return "";
    }


}

