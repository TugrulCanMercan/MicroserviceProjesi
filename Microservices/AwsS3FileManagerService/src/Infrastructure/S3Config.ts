import multer from "multer";
import S3 from "aws-sdk/clients/s3";

export default class S3Config {
    public uploadMulter: multer.Multer
    public s3Client: S3
    public bucketName:string

    constructor(uploadMulter: multer.Multer,
                s3Client: S3,
                bucketName:string
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