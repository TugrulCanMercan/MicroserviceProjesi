import ImageDTO from "../DTO/ImageDTO";

export default interface IS3DownloadUsecase<ImageEntity>{
    downloadImage(ImageFile:Express.Multer.File): Promise<ImageDTO>

}