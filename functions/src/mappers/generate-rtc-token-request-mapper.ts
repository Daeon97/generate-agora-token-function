import { Request } from "firebase-functions/v2/https";
import { Result } from "../models/result";
import { Credential } from "../models/credential";
import { RequestMethod, StatusCode } from "../utils/enums";
import { CredentialValidator } from "../validators/credential-validator";

export class GenerateRTCTokenRequestMapper {
    public validateRequest(request: Request): Result {
        return this.checkRequestMethodAllowed(request);
    }

    private checkRequestMethodAllowed(request: Request): Result {
        const requestMethod = request.method;

        if (requestMethod !== RequestMethod.POST) {
            const result = new Result(
                StatusCode.MethodNotAllowed,
                { 'message': `Request method ${requestMethod} is not allowed` }
            );
            return result;
        }

        return this.checkPostRequestHasBody(request);
    }

    private checkPostRequestHasBody(request: Request): Result {
        if (!request.body) {
            const result = new Result(
                StatusCode.BadRequest,
                { 'message': 'Request does not specify a body. Please specify the appropriate request body' }
            );
            return result;
        }

        return this.checkPostRequestBodyComplete(request);
    }

    private checkPostRequestBodyComplete(request: Request): Result {
        const credential = Credential.fromRequest(request.body);

        if (!credential.channelName || !credential.userId) {
            const result = new Result(
                StatusCode.BadRequest,
                { 'message': 'Request body is incomplete. Please specify all required data' }
            );
            return result;
        }

        const credentialValidator = new CredentialValidator();
        return credentialValidator.validateCredential(credential);
    }
}