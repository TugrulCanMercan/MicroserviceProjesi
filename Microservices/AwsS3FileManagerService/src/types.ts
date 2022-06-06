import ImageDTO from "./Domain/DTO/ImageDTO";
import S3Config from "./Infrastructure/S3Config";
import multer from "multer";
import S3Controller from "./EntryPoint/Controllers/S3Controller";


export const TYPES = {
    IS3DownloadUsecase:Symbol.for("IS3DownloadUsecase"),
    IUploadImageUsecase:Symbol.for("IUploadImageUsecase"),
    IRepository:Symbol.for("IRepository"),
    S3Config:Symbol.for("S3Config"),
    uploadMulter: Symbol.for("uploadMulter"),
    s3Client: Symbol.for("s3Client"),
    bucketName:Symbol.for("bucketName"),
    S3Controller:Symbol.for("S3Controller"),
    Konum:Symbol.for("Konum"),
    Adress:Symbol.for("Adress"),
    enlem:Symbol.for("enlem"),
    boylam:Symbol.for("boylam"),
}
