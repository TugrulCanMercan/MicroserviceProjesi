import ImageDTO from "../DTO/ImageDTO";
import ImageEntity from "../Entity/ImageEntity";


export interface DownLoadUseCaseTransaction<ImageEntity> {}


export default interface IS3DownloadUsecase extends DownLoadUseCaseTransaction<ImageEntity>{
    downloadImage(ImageFile:string): Promise<ImageDTO>

}