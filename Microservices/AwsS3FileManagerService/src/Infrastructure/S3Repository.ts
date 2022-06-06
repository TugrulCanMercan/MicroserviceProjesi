import S3Config from "./S3Config";
import IRepository from "../Domain/İnterfaces/IRepository";
import fs from "fs";
import internal from "stream";
import S3 from "aws-sdk/clients/s3";
import {PromiseResult} from "aws-sdk/lib/request";
import {AWSError} from "aws-sdk";
import ImageEntity from "../Domain/Entity/ImageEntity";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "../types";
@injectable()
export default class S3Repository implements IRepository{

    S3Manager:S3Config

    constructor(@inject(TYPES.S3Config) S3Manager:S3Config) {
        this.S3Manager = S3Manager
    }



    async getPhotosWithId(fileId:string): Promise<internal.Readable>{
        const downloadParams = {
            Key: fileId,
            Bucket:this.S3Manager.bucketName
        }

        return this.S3Manager.s3Client.getObject(downloadParams).createReadStream()
    }

    uploadPhotos(filePath: ImageEntity):Promise<S3.ManagedUpload.SendData> {

        return new Promise((resolve,reject)=>{
            // console.log(`GELEN : ${filePath.Image.path}`)
            const fileStream = fs.createReadStream(`uploads/${filePath.imageId}`)

            const uploadParams = {
                Bucket:this.S3Manager.bucketName,
                Body:fileStream!,
                Key:`${filePath.OwnerId}/${filePath.imageId}`,

            }
            resolve(this.S3Manager.s3Client.upload(uploadParams).promise())
        })


    }
}