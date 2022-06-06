import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
class Konum{

    constructor(
        @inject(TYPES.enlem) public enlem:string,
        @inject(TYPES.boylam) public boylam:string

    ) {
    }
}
@injectable()
class Adress{
    constructor(
        @inject(TYPES.Konum) public konum:Konum
    ) {
    }
}
export {Konum,Adress}