import mongoose, {Model} from "mongoose";

import {IRepository} from "../../Core/Interfaces/IRepository";

export default abstract class Repository<T extends mongoose.Document> implements IRepository<T>{

    constructor(
        public _model: mongoose.Model<T>,

    ) {
    }


    async create(item: T):Promise<T>{
        return new Promise((resolve, reject)=>{
            this._model.create(item,(err,res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
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

    find(query:any): Promise<T[]> {
        return new Promise((resolve,reject)=>{
            this._model.find(query,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }else{

                    resolve(result as T[])
                }
            })
        })
    }

    findOne(id: string): Promise<T> {
        return new Promise((resolve,reject)=>{
            this._model.findById({_id:id},{},{},(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result as T)
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

