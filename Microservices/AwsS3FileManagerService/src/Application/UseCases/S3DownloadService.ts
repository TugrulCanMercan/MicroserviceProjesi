import IRepository from "../../Domain/İnterfaces/IRepository";
import ImageEntity from "../../Domain/Entity/ImageEntity";
import internal from "stream";
import IS3DownloadUsecase from "../../Domain/UseCase/IS3DownloadUsecase";



import multer from "multer";

import ImageDTO from "../../Domain/DTO/ImageDTO"


export default class S3DownloadService implements IS3DownloadUsecase<ImageDTO>{

    S3Repository:IRepository

    constructor(S3Repository:IRepository) {
        this.S3Repository = S3Repository
    }



    async downloadImage(ImageFile:Express.Multer.File): Promise<ImageDTO> {
        const image = await this.S3Repository.getPhotosWithId(ImageFile.filename)
        const dto:ImageDTO = {
            image:image
        }
        return dto
    }



}