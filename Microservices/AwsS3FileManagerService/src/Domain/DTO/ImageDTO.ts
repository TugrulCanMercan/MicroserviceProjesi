import S3 from "aws-sdk/clients/s3";


export default interface ImageDTO{

    image?: S3.GetObjectOutput

}