import mongoose from "mongoose";
import mongoDb, {Schema} from "mongoose";
import {IUserModel} from "../../Core/Model/IUserModel";


const UserSchema = new Schema<IUserModel>({
    name:String,
    surname:String,
    password:String,
    email:String,
    userQuestionLibrary:[String],
    userExamLibrary:[String]

})


const UserModel = mongoDb.model<IUserModel>("Exams",UserSchema,"UserCollection")
export default UserModel