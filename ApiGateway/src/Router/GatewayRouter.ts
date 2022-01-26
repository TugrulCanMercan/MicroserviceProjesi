import {Router, Request, Response, NextFunction} from "express";
import registryJson from "./registry.json";
import * as fs from 'fs';
import * as path from 'path';


import {IRegistry} from "../Interfaces/IRegistry";
import {verifyToken, verifyRefreshToken} from "../Middleware/authMiddleware";


import axios from "axios";

const gatewayRouter = Router()
const registry: IRegistry = registryJson


gatewayRouter.all('/gateway/:ApiName/:path', verifyToken, (req, res) => {


    if (registry.services[req.params.ApiName]) {

        if (registry.services[req.params.ApiName].route.find((result) => {

            return result === `/${req.params.path}`
        }) === undefined) {
            return res.send("path hatası")
        }

        // @ts-ignore
        axios({
            method: req.method,
            url: registry.services[req.params.ApiName].url + req.params.path,
            header: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        }).catch(err => {
            res.send(`server hatası ${err}`)
        })
    } else {
        res.send("Api Not Exist")
    }

})
gatewayRouter.post('/register', (req, res) => {
    const registrationInfo = req.body


    registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`

    registry.services[registrationInfo.apiName] = {...registrationInfo}

    fs.writeFile(path.join(__dirname, './registry.json'), JSON.stringify(registry), (err) => {
        if (err) {
            res.send(`could not register ${registrationInfo.apiName} \n ${err}`)
        } else {
            res.send(`Successful registered ${registrationInfo.apiName}`)
        }
    })

})


export default gatewayRouter


