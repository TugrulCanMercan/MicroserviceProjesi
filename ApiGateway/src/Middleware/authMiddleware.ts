import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";





export function verifyToken(req:Request,res:Response,next:NextFunction){
    try {

        const token = req.headers.authorization?.split(' ')[1];

        const decoded = jwt.verify(token!, process.env.JSON_WEB_SECRET_TOKEN!);
        req.body.userData = decoded

        console.log(decoded)

        // varify blacklisted access token.
        // redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
        //     if(err) throw err;
        //
        //     if(data === token) return res.status(401).json({status: false, message: "blacklisted token."});
        //     next();
        // })
    } catch (error) {
        return res.status(401).json({status: false, message: "Your session is not valid.", data: error});
    }

}
export function verifyRefreshToken(req:Request,res:Response,next:NextFunction){

}