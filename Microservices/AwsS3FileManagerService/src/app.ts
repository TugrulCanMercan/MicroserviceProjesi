
import express from "express"
import 'dotenv/config'
import S3Manager from "./S3Manager";
import * as fs from 'fs';
import * as util from 'util';
import S3Controller from "./EntryPoint/Controllers/S3Controller";
const unlinkFile = util.promisify(fs.unlink)
const PORT = process.env.PORT || 5004
const server = express()

const AWSS3 = new S3Manager()
const s3controller = new S3Controller()
server.use(express.json())


server.get("/getImages/:key",(req,res)=>{
    const key = req.params.key
    const readStream = AWSS3.getImageStream(key)
    readStream.pipe(res)
})

server.post('/images',AWSS3.uploadMulter.single("image"),async (req,res)=>{
    const file:Express.Multer.File | undefined = req.file
    console.log(file)
    const result = await AWSS3.upload(file)
    await unlinkFile(file?.path!)
    console.log(result)
    const decription = req.body.description

    res.send({ imagePath: `/images/${result.Key}`})
})


server.listen(PORT,()=>{
    console.log(`${PORT}'u dinleniyor`)
})