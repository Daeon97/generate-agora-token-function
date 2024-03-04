import { Request } from "firebase-functions/v2/https";
import { Result } from "../models/result";
import { RequestMethod, StatusCode } from "../utils/enums";

export class GenerateRTCTokenRequestMapper {
    constructor() { }

    public mapRequest(request: Request): Result {
        const requestMethod = request.method;

        let result: Result;

        if (requestMethod !== RequestMethod.POST) {
            result = new Result(StatusCode.MethodNotAllowed, { 'message': `Request method ${requestMethod} is not allowed` });
            return result;
        }

        result = new Result(StatusCode.Created, { 'message': 'Token created', 'token': '16646246TEST0000', 'channelId': 'TEST_CHANNEL_6', 'userId': '-1' });
        return result;
    }
}