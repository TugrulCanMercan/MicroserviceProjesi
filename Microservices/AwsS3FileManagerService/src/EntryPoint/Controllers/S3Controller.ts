import S3UploadUseCase from "../../Application/UseCases/S3UploadUseCase";
import S3DownloadService from "../../Application/UseCases/S3DownloadService";
import {Request,Response} from "express";
import ImageEntity from "../../Domain/Entity/ImageEntity";

export default class S3Controller{


    constructor(
        private s3UploadUsecase:S3UploadUseCase,
        private s3DownLoadUsecase:S3DownloadService
    ) {
    }

    async getDownLoad(req:Request,res:Response){
        if (typeof req.file !== "undefined"){
            const file = req.file
            const result = await this.s3DownLoadUsecase.downloadImage(file)
            res.send(result)
        }
    }
    async uploadImage(req:Request,res:Response){

        if(typeof req.file !== "undefined"){
            const entity:ImageEntity = {
                imageId:req.file?.filename,
                Image:req.file
            }
            const result = await this.s3UploadUsecase.uploadImage(entity)
            res.send(result)
        }



    }


}