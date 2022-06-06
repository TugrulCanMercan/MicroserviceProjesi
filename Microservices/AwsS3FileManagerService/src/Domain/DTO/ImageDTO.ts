import S3 from "aws-sdk/clients/s3";
import internal from "stream";


export default interface ImageDTO{

    image?: internal.Readable

}