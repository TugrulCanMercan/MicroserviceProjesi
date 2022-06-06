import S3UploadUseCase from "../../Application/UseCases/S3UploadService";
import S3DownloadService from "../../Application/UseCases/S3DownloadService";
import {Request,Response} from "express";
import ImageEntity from "../../Domain/Entity/ImageEntity";
import {inject, injectable} from "inversify";
import IUploadImageUsecase from "../../Domain/UseCase/IUploadImageUsecase";
import IS3DownloadUsecase from "../../Domain/UseCase/IS3DownloadUsecase";
import {TYPES} from "../../types";
import S3UploadService from "../../Application/UseCases/S3UploadService";
import ImageUploadDTO from "../../Domain/DTO/ImageUploadDTO";
import fs from "fs";
import internal from "stream";
@injectable()
export default class S3Controller{
    s3UploadService:IUploadImageUsecase
    s3DownLoadUsecase:IS3DownloadUsecase
    constructor(
        @inject(TYPES.IUploadImageUsecase)  s3UploadService:IUploadImageUsecase,
        @inject(TYPES.IS3DownloadUsecase)  s3DownLoadUsecase:IS3DownloadUsecase
    ) {
        this.s3DownLoadUsecase = s3DownLoadUsecase
        this.s3UploadService = s3UploadService
    }

    async getDownLoad(req:Request,res:Response){

            const file = `${req.params.id}/${req.params.key}`


            const result = await this.s3DownLoadUsecase.downloadImage(file)

            result.image?.pipe(res)

    }
    async uploadImage(req:Request):Promise<ImageUploadDTO>{

        console.log(req)
            const entity:ImageEntity = {
                imageId:req.file?.filename!,
                OwnerId:req.body.OwnerId
            }
            const result = await this.s3UploadService.uploadImage(entity)
        return result
    }
}