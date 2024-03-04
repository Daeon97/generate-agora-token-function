import { Result } from "../models/result";
import { Credential } from "../models/credential";
import { RtcRole, RtcTokenBuilder } from "agora-token";
import { StatusCode } from "../utils/enums";
import { defineString } from "firebase-functions/params";

export class RTCTokenGeneratorHandler {
    public handleTokenGenerationUsing(credential: Credential): Result {
        const tokenExpirationTooLong = this.isTokenExpirationTooLong(credential.tokenExpirationSeconds);

        if (tokenExpirationTooLong) {
            const result = new Result(
                StatusCode.PreconditionFailed,
                { 'message': 'The maximum allowed token expiration time is 86400 seconds or 24 hours. Please specify a shorter or equal token expiration time' }
            );
            return result;
        }

        return this.generateTokenFrom(credential);
    }

    private isTokenExpirationTooLong(tokenExpirationSeconds?: number): boolean {
        if (!tokenExpirationSeconds) return false;

        if (tokenExpirationSeconds > 86400) return true;

        return false;
    }

    private generateTokenFrom(credential: Credential): Result {
        const appID = defineString("APP_ID").value();
        const appCertificate = defineString("APP_CERTIFICATE").value();
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
                { token, 'userId': uid, channelName, 'tokenExpirationSeconds': tokenExpiry, privilegeExpiry }
            );
            return result;

        } catch (err) {
            const result = new Result(
                StatusCode.InternalError,
                { 'message': 'There was an error generating the token. Try changing the channel name' }
            );
            return result;
        }
    }
}