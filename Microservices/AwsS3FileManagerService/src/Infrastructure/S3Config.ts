import multer from "multer";
import S3 from "aws-sdk/clients/s3";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
@injectable()
export default class S3Config {
    public uploadMulter: multer.Multer
    public s3Client: S3
    public bucketName:string

    constructor(@inject(TYPES.uploadMulter) uploadMulter: multer.Multer,
                @inject(TYPES.s3Client) s3Client: S3,
                @inject(TYPES.bucketName) bucketName:string
    ) {
        this.uploadMulter = uploadMulter
        this.s3Client = s3Client
        this.bucketName = bucketName
    }
}

// = multer({dest: "uploads/"})
//
//     = new S3({
//     region: region,
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey
// })