import {Request, Response, Router} from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import redis_client from "../Connection/RedisConnection";
import {verifyRefreshToken} from "../Middleware/authMiddleware";


const GatewayAuthRouter = Router()

GatewayAuthRouter.post('/signUp',(req,res)=>{
    axios.post('http://userservice:5000/register',req.body).then((response)=>{
        res.send(response.data)
    })
})
GatewayAuthRouter.post('/login',(req,res)=>{
    axios.post('http://userservice:5000/userControl',req.body).then((response)=>{
        try {
            const user = response.data
            if(user === null) res.status(401).json({status: false, message: "username or password is not valid."});
            console.log('user', user);
            const access_token = jwt.sign({sub: user._id}, process.env.JSON_WEB_SECRET_TOKEN ||"", { expiresIn: '1h'});
            console.log('access_token', access_token);
            const refresh_token = GenerateRefreshToken(user._id);
            return res.json({status: true, message: "login success", data: {access_token, refresh_token}});
        }catch (err){
            return res.status(401).json({status: true, message: "login fail", data: err});
        }

    })
})
GatewayAuthRouter.post('/token',verifyRefreshToken,GetAccessToken)

function GetAccessToken (req:Request, res:Response) {
    const user_id = req.body.userData.sub;

    const access_token = jwt.sign({sub: user_id}, process.env.JSON_WEB_SECRET_TOKEN ||"", { expiresIn: '1h'});
    const refresh_token = GenerateRefreshToken(user_id);
    return res.json({status: true, message: "success", data: {access_token, refresh_token}});
}
function GenerateRefreshToken(user_id:string) {
    const refresh_token = jwt.sign({ sub: user_id }, process.env.JSON_WEB_REFRESH_TOKEN || "", { expiresIn: '1h' });

    redis_client.get(user_id.toString(), (err, data) => {
        if(err) throw err;

        redis_client.set(user_id.toString(), JSON.stringify({token: refresh_token}));
    })

    return refresh_token;
}

export default GatewayAuthRouter