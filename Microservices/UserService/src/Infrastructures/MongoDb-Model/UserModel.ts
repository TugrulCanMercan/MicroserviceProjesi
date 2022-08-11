import mongoose from "mongoose";
import mongoDb, {Schema} from "mongoose";
import {IUserModel} from "../../Core/Model/IUserModel";
import {v4 as uuidv4} from "uuid";

const UserSchema = new Schema<IUserModel>({
    _id: { type: String, default: uuidv4()},
    name:String,
    surname:String,
    password:String,
    email:String,
    userQuestionLibrary:[String],
    userExamLibrary:[String]

})


const UserModel = mongoDb.model<IUserModel>("Exams",UserSchema,"UserCollection")
export default UserModel