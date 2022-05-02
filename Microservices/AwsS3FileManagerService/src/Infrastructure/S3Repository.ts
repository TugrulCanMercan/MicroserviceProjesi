import S3Config from "./S3Config";
import IRepository from "../Domain/İnterfaces/IRepository";
import fs from "fs";
import internal from "stream";
import S3 from "aws-sdk/clients/s3";
import {PromiseResult} from "aws-sdk/lib/request";
import {AWSError} from "aws-sdk";
import ImageEntity from "../Domain/Entity/ImageEntity";
import {DEFAULT_ENCODING} from "crypto";


class S3Repository implements IRepository{

    S3Manager:S3Config

    constructor(S3Manager:S3Config) {
        this.S3Manager = S3Manager
    }



    async getPhotosWithId(fileId:string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
        const downloadParams = {
            Key: fileId,
            Bucket:this.S3Manager.bucketName
        }
        return this.S3Manager.s3Client.getObject(downloadParams).promise()
    }

    uploadPhotos(filePath: ImageEntity):Promise<S3.ManagedUpload.SendData> {
        const fileStream = fs.createReadStream(filePath.imageId)
        const uploadParams = {
            Bucket:this.S3Manager.bucketName,
            Body:fileStream!,
            Key:filePath.imageId
        }
        return this.S3Manager.s3Client.upload(uploadParams).promise()
    }
}