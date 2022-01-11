export interface IRegistry {
    services: Services;
}
interface Services {
    [index:string]: TestAPI;
}

export interface TestAPI {
    apiName: string;
    protocol:string
    host:    string;
    port:    number;
    url:     string;
    route: string[]
}