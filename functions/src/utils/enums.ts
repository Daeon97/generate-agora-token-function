export enum RequestMethod {
    POST = 'POST'
}

export enum StatusCode {
    Created = 201,
    InternalError = 500,
    MethodNotAllowed = 405,
    BadRequest = 400,
    PreconditionFailed = 412
}