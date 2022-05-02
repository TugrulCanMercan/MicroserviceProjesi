import S3 from "aws-sdk/clients/s3"
import * as fs from 'fs';
import * as path from 'path';
import multer, {Multer} from "multer";

// SONRADAN OPSYONEL KONTROL ET
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.S3BUCKET_ACCESS_KEY
const secretAccessKey = process.env.S3BUCKET_SECRET_ACCESS_KEY


// const s3 = new S3({
//     region:region,
//     accessKeyId:accessKey,
//     secretAccessKey:secretAccessKey
// })

export default class S3Manager {
    public uploadMulter: multer.Multer = multer({dest:"uploads/"})

    public s3Client = new S3({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    })



//     fs.writeFile(path.join(__dirname, './registry.json'), JSON.stringify(registry), (err) => {
//     if (err) {
//         res.send(`could not register ${registrationInfo.apiName} \n ${err}`)
//     } else {
//     res.send(`Successful registered ${registrationInfo.apiName}`)
// }
// })

    getImageStream(fileKey:string){
        const downloadParams = {
            Key: fileKey,
            Bucket:bucketName!
        }
        return this.s3Client.getObject(downloadParams).createReadStream()
    }

    async upload(file:Express.Multer.File | undefined){


        const fileStream = fs.createReadStream(file?.path!)

        //tür kontrolü yapılmalı ! işareti için unutma
        const uploadParams = {
            Bucket:bucketName!,
            Body:fileStream!,
            Key:file?.filename!
        }


            return this.s3Client.upload(uploadParams).promise()
    }

}



//downloads