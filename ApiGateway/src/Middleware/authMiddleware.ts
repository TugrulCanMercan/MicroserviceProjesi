import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import redis_client from "../Connection/RedisConnection";






export function verifyToken(req:Request,res:Response,next:NextFunction){
    try {

        const token = req.headers.authorization?.split(' ')[1];

        const decoded = jwt.verify(token!, process.env.JSON_WEB_SECRET_TOKEN!);
        req.body.UUID = decoded
        // req.body.token = token
        req.body.token = token
        console.log("asdasds")
        // @ts-ignore
        redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
            if(err) throw err;

            if(data === token) return res.status(401).json({status: false, message: "blacklisted token."});
            next();
        })
        console.log(decoded)


    } catch (error) {
        return res.status(401).json({status: false, message: "Your session is not valid.", data: error});
    }

}
export function verifyRefreshToken(req:Request,res:Response,next:NextFunction){
    const token = req.body.token;

    if(token === null) return res.status(401).json({status: false, message: "Invalid request."});
    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_REFRESH_TOKEN || "");
        req.body.userData = decoded;
        // verify if token is in store or not


        redis_client.get(decoded.sub!.toString(), (err, data) => {
            if(err) throw err;

            if(data === null) return res.status(401).json({status: false, message: "Invalid request. Token is not in store."});
            if(JSON.parse(data).token != token) return res.status(401).json({status: false, message: "Invalid request. Token is not same in store."});

            next();
        })
    } catch (error) {
        return res.status(401).json({status: true, message: "Your session is not valid.", data: error});
    }
}