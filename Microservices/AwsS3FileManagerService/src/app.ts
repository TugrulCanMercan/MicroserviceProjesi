
import express from "express"
import 'dotenv/config'
import "reflect-metadata";

import * as fs from 'fs';
import * as util from 'util';
import {container} from "./DIManager";
import S3Controller from "./EntryPoint/Controllers/S3Controller";

import multer from "multer";
import {TYPES} from "./types";


const unlinkFile = util.promisify(fs.unlink)
const PORT = process.env.PORT || 5004
const server = express()
const controller = container.get<S3Controller>(TYPES.S3Controller)



server.use(express.json())


const uploadMulter: multer.Multer = multer({dest:"uploads/"})
server.get("/getImages/OwnerId/:id/ImageId/:key",async (req,res)=>{


    await controller.getDownLoad(req,res)

})


server.post('/images',uploadMulter.single("image"), (req,res)=>{


    controller.uploadImage(req).then(result=>res.send(result))
})




server.listen(PORT,()=>{
    console.log(`${PORT}'u dinleniyor`)
})