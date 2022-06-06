
import {Container, interfaces} from "inversify";
import S3Config from "./Infrastructure/S3Config";
import {TYPES} from "./types";
import multer from "multer";
import S3 from "aws-sdk/clients/s3";
import IRepository from "./Domain/İnterfaces/IRepository";
import S3Repository from "./Infrastructure/S3Repository";
import S3DownloadService from "./Application/UseCases/S3DownloadService";
import IS3DownloadUsecase from "./Domain/UseCase/IS3DownloadUsecase";
// import ImageEntity from "./Domain/Entity/ImageEntity";
// import S3UploadUseCase from "./Application/UseCases/S3UploadService";
import IUploadImageUsecase from "./Domain/UseCase/IUploadImageUsecase";

// import ImageUploadDTO from "./Domain/DTO/ImageUploadDTO";
import S3Controller from "./EntryPoint/Controllers/S3Controller";
import {Adress, Konum} from "./WorkOut/Konum";
import S3UploadService from "./Application/UseCases/S3UploadService";
const container = new Container()
    // .toDynamicValue((context: interfaces.Context) => { return new Katana(); });

// container.bind<S3Config>(TYPES.S3Config).toDynamicValue((context: interfaces.Context) =>Promise.resolve( new S3Config(multer({dest:"uploads/"}),new S3({
//     region:process.env.AWS_BUCKET_REGION,
//     accessKeyId:process.env.S3BUCKET_ACCESS_KEY,
//     secretAccessKey:process.env.S3BUCKET_SECRET_ACCESS_KEY
// }),process.env.AWS_BUCKET_NAME!)))
//
//
//
container.bind<S3Config>(TYPES.S3Config).toConstantValue(new S3Config(multer({dest:"uploads/"}),new S3({
    region:process.env.AWS_BUCKET_REGION,
    accessKeyId:process.env.S3BUCKET_ACCESS_KEY,
    secretAccessKey:process.env.S3BUCKET_SECRET_ACCESS_KEY
}),process.env.AWS_BUCKET_NAME!))
//
container.bind<IRepository>(TYPES.IRepository).to(S3Repository)
container.bind<IS3DownloadUsecase>(TYPES.IS3DownloadUsecase).to(S3DownloadService)
container.bind<IUploadImageUsecase>(TYPES.IUploadImageUsecase).to(S3UploadService)
container.bind<S3Controller>(TYPES.S3Controller).toDynamicValue((context)=>{
    const downLoadUSC = context.container.get<IS3DownloadUsecase>(TYPES.IS3DownloadUsecase)
    const uploadUSC = context.container.get<IUploadImageUsecase>(TYPES.IUploadImageUsecase)

    return new S3Controller(uploadUSC,downLoadUSC)
})
// ************

container.bind<Konum>(TYPES.Konum).toConstantValue(new Konum("tugurl","mercan"))
container.bind<Adress>(TYPES.Adress).to(Adress)



// ************
export {container}
