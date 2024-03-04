export class Credential {
    constructor(
        public readonly userId: string | number,
        public readonly channelName: string,
        public readonly tokenExpirationSeconds?: number
    ) { }

    static fromRequest(request: any): Credential {
        return new Credential(
            request.userId,
            request.channelName,
            request.tokenExpirationSeconds,
        );
    }
}