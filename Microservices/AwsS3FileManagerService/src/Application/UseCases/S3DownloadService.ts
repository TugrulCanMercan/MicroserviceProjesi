import IRepository from "../../Domain/İnterfaces/IRepository";
import ImageEntity from "../../Domain/Entity/ImageEntity";
import internal from "stream";
import IS3DownloadUsecase from "../../Domain/UseCase/IS3DownloadUsecase";

import { injectable, inject } from "inversify";
import multer from "multer";

import ImageDTO from "../../Domain/DTO/ImageDTO"
import {TYPES} from "../../types";

@injectable()
export default class S3DownloadService implements IS3DownloadUsecase{

    S3Repository:IRepository

    constructor(@inject(TYPES.IRepository) S3Repository:IRepository) {
        this.S3Repository = S3Repository
    }



    async downloadImage(ImageFile:string): Promise<ImageDTO> {
        const image = await this.S3Repository.getPhotosWithId(ImageFile)
        const dto:ImageDTO = {
            image:image
        }
        return dto
    }



}
