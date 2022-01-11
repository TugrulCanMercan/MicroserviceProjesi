import {Router} from "express";
import axios from "axios";

const GatewayAuthRouter = Router()

GatewayAuthRouter.post('/signUp',(req,res)=>{
    axios.post('http://localhost:5000/register')
})

export default GatewayAuthRouter