import mongoose from "mongoose";

export interface IWrite<T extends mongoose.Document>  {
    create(item: T):Promise<string>
    update(id: string, item: T): Promise<void>;
    delete(id: string): Promise<boolean>;
}


export interface IRead<T extends mongoose.Document> {
    find(query:any,item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
}
export interface IRepository<T extends mongoose.Document> extends IRead<T>, IWrite<T> {
    getName: () => string;
}