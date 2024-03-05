import { Result } from "../models/result";
import { Credential } from "../models/credential";
import { RtcRole, RtcTokenBuilder } from "agora-token";
import { StatusCode } from "../utils/enums";

export class RTCTokenGenerator {
    public generateTokenFrom(credential: Credential): Result {
        const appID = process.env.APP_ID!;
        const appCertificate = process.env.APP_CERTIFICATE!;
        const channelName = credential.channelName;
        const uid = credential.userId;
        const role = RtcRole.PUBLISHER;
        const tokenExpiry = credential.tokenExpirationSeconds ?? 86400;
        const privilegeExpiry = tokenExpiry;

        try {
            const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, tokenExpiry, privilegeExpiry);

            if (token.trim() === '') throw 'Token cannot be an empty string';

            const result = new Result(
                StatusCode.Created,
                { token, 'userId': uid, channelName, 'tokenExpirationSeconds': tokenExpiry, 'privilegeExpirationSeconds': privilegeExpiry }
            );
            return result;

        } catch (err) {
            const result = new Result(
                StatusCode.InternalError,
                { 'message': 'There was an error generating the token. Please check that the values supplied match the API specification' }
            );
            return result;
        }
    }
}