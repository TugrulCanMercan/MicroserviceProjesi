


import {Request,Response} from "express";
import UserModel from "../../Infrastructures/MongoDb-Model/UserModel";
import {UserRepository} from "../../Infrastructures/Repository/UserRepository";



export default async (req:Request,questionRepo:UserRepository) => {



    const createNewUser = new UserModel({
        name:req.body.username,
        surname:req.body.surname,
        password:req.body.password,
        email:req.body.email,
        userExamInvite:req.body.userExamInvite
    })
    // return await questionRepo.save(createNewUser)
    return await questionRepo.addUser(createNewUser)
    // await questionRepo.create(addQuestion)


}