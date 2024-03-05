import { Result } from "../models/result";
import { Credential } from "../models/credential";
import { StatusCode } from "../utils/enums";
import { RTCTokenGenerator } from "../generators/rtc-token-generator";

export class CredentialValidator {
    public validateCredential(credential: Credential): Result {
        return this.checkUserIdValid(credential);
    }

    private checkUserIdValid(credential: Credential): Result {
        const userIdValid = this.isUserIdValid(credential.userId);

        if (!userIdValid) {
            const result = new Result(
                StatusCode.PreconditionFailed,
                { 'message': 'Please specify a user ID greater than or equal to 1 and less than or equal to 100' }
            );
            return result;
        }

        return this.checkChannelNameValid(credential);
    }

    private isUserIdValid(userId: number): boolean {
        return userId >= 1 && userId <= 100;
    }

    private checkChannelNameValid(credential: Credential): Result {
        const channelNameValid = this.isChannelNameValid(credential.channelName);

        if (!channelNameValid) {
            const result = new Result(
                StatusCode.PreconditionFailed,
                { 'message': 'Channel name can only contain any combination of letters a-z, A-Z, digits 0-9 and special characters "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~" and ","' }
            );
            return result;
        }

        return this.checkTokenExpirationValid(credential);
    }

    private isChannelNameValid(channelName: string): boolean {
        const validChannelNameRegex = /^[\w!#$%&\(\)\+-:;<=\.>\?@\[\]^{}|~,]+$/;
        return validChannelNameRegex.test(channelName);
    }

    private checkTokenExpirationValid(credential: Credential) {
        const tokenExpirationTooShort = this.isTokenExpirationTooShort(credential.tokenExpirationSeconds);

        if (tokenExpirationTooShort) {
            const result = new Result(
                StatusCode.PreconditionFailed,
                { 'message': 'The minimum allowed token expiration time is 300 seconds or 5 minutes. Please specify an expiration time greater than or equal to 300 seconds and less than or equal to 86400 seconds' }
            );
            return result;
        }

        return this.checkTokenExpirationTooLong(credential);
    }

    private isTokenExpirationTooShort(tokenExpirationSeconds?: number): boolean {
        if (!tokenExpirationSeconds) return false;

        if (tokenExpirationSeconds < 300) return true;

        return false;
    }

    private checkTokenExpirationTooLong(credential: Credential): Result {
        const tokenExpirationTooLong = this.isTokenExpirationTooLong(credential.tokenExpirationSeconds);

        if (tokenExpirationTooLong) {
            const result = new Result(
                StatusCode.PreconditionFailed,
                { 'message': 'The maximum allowed token expiration time is 86400 seconds or 24 hours. Please specify an expiration time greater than or equal to 300 seconds and less than or equal to 86400 seconds' }
            );
            return result;
        }

        const rtcTokenGenerator = new RTCTokenGenerator();
        return rtcTokenGenerator.generateTokenFrom(credential);
    }

    private isTokenExpirationTooLong(tokenExpirationSeconds?: number): boolean {
        if (!tokenExpirationSeconds) return false;

        if (tokenExpirationSeconds > 86400) return true;

        return false;
    }
}