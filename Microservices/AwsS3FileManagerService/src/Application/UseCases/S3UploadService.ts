import IRepository from "../../Domain/İnterfaces/IRepository";
import ImageEntity from "../../Domain/Entity/ImageEntity";
import internal from "stream";
import IUploadImageUsecase from "../../Domain/UseCase/IUploadImageUsecase";
import ImageDTO from "../../Domain/DTO/ImageDTO";
import ImageUploadDTO from "../../Domain/DTO/ImageUploadDTO";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types"
@injectable()
export default class S3UploadService implements IUploadImageUsecase{

    S3Repository:IRepository

    constructor(@inject(TYPES.IRepository) S3Repository:IRepository) {
        this.S3Repository = S3Repository
    }

    async uploadImage(ImageFile: ImageEntity): Promise<ImageUploadDTO> {
        const result = await this.S3Repository.uploadPhotos(ImageFile)
        const dto: ImageUploadDTO = {
            imageKey:result.Key
        }
        return dto
        throw new Error("Method not implemented.");
    }









    // async uploadImge(image:ImageEntity)  {
    //
    //     return await this.S3Repository.uploadPhotos(image.Image)
    //
    // }





}