import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { GenerateRTCTokenRequestMapper } from "./mappers/generate-rtc-token-request-mapper";

export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const generateRTCToken = onRequest((request, response) => {
    const generateRTCTokenRequestMapper = new GenerateRTCTokenRequestMapper();

    const mapRequestResult = generateRTCTokenRequestMapper.mapRequest(request);

    response.status(mapRequestResult.statusCode).send(mapRequestResult.body);
});
