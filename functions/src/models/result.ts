import { StatusCode } from "../utils/enums";

export class Result {
    constructor(public readonly statusCode: StatusCode, public readonly body: { [key: string]: any }) { }
}