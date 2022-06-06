import multer from "multer";
import internal from "stream";
import S3 from "aws-sdk/clients/s3";
import {PromiseResult} from "aws-sdk/lib/request";
import {AWSError} from "aws-sdk";
import ImageEntity from "../Entity/ImageEntity";


export default interface IRepository {


    uploadPhotos(filePath:ImageEntity):Promise<S3.ManagedUpload.SendData>

    getPhotosWithId(fileId:string): Promise<internal.Readable>

}
