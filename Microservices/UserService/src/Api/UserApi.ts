import {Router} from "express";
import {UserRepository} from "../Infrastructures/Repository/UserRepository";
import UserModel from "../Infrastructures/MongoDb-Model/UserModel";
import {IQuestionEvent} from "../Core/Interface/IQuestionEvent";

import UserController from "../Controller/UserController";
import * as amqp from 'amqplib/callback_api';

const UserApi = Router()

const userRepository = new UserRepository(UserModel)
const userController = new UserController(userRepository)



amqp.connect('amqp://localhost', (error, connection) => {
    if (error) {
        throw error
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1
        }
        channel.assertQueue('UserQuestionEvent')

        channel.consume('UserQuestionEvent', (msg) => {
            if (msg !== null) {
                const data:IQuestionEvent = JSON.parse(msg.content.toString())

                // const ReceiveData = msg.content.toString()


                userController.addLibraryConsumer(data)
                channel.ack(msg);
            }
        })

        UserApi.get("/testApi", (req, res) => {
            res.send("gateway yonlendirdi")
        })
        UserApi.post('/register', (request, response) => {

            userController.createNewUser(request).then((result) => {
                response.send(result)
            })
        })

    })

})



export default UserApi
