import ImageDTO from "../DTO/ImageDTO";
import ImageEntity from "../Entity/ImageEntity";
import ImageUploadDTO from "../DTO/ImageUploadDTO";

export interface UploadUsecaseTransaction<Entity,ImageUploadDTO>{}
export default interface IUploadImageUsecase extends UploadUsecaseTransaction <ImageEntity,ImageUploadDTO>{
    uploadImage(ImageFile:ImageEntity): Promise<ImageUploadDTO>
}