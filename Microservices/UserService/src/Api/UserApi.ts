import {Router} from "express";
import {UserRepository} from "../Infrastructures/Repository/UserRepository";
import UserModel from "../Infrastructures/MongoDb-Model/UserModel";
import {IQuestionEvent} from "../Core/Interface/IQuestionEvent";

import UserController from "../Controller/UserController";
import amqp from 'amqplib/callback_api';
import {IExamEvent} from "../Core/Interface/IExamEvent";

const UserApi = Router()

const userRepository = new UserRepository(UserModel)
const userController = new UserController(userRepository)



amqp.connect('amqp://rabbit', (error, connection) => {
    if (error) {
        throw error
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1
        }
        channel.assertQueue('UserQuestionEvent')
        channel.assertQueue('UserAddExamQueue')

        channel.consume('UserQuestionEvent', (msg) => {
            if (msg !== null) {
                const data:IQuestionEvent = JSON.parse(msg.content.toString())



                userController.addLibraryQuestionConsumer(data).then((result)=>{
                    console.log(result)
                })

                channel.ack(msg);
            }
        })
        channel.consume('UserAddExamQueue',(msg)=>{
            if (msg !== null) {
                const data:IExamEvent = JSON.parse(msg.content.toString())



                userController.addLibraryExamConsumer(data).then((result)=>{
                    console.log(result)
                })

                channel.ack(msg);
            }
        })



        UserApi.post('/register', (request, response) => {

            userController.createNewUser(request).then((result) => {
                response.send(result)
            })
        })
        UserApi.post('/userControl',(req,res)=>{
            userController.userLoginCheck(req).then((result)=>{
                res.send(result)
            })
        })
        UserApi.get('/getUser',(req,res)=>{
            userController.getUser(req).then((result)=>{
                res.send(result)
            })
        })
    })

})



export default UserApi
