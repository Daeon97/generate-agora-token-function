import { onRequest } from "firebase-functions/v2/https";
import { GenerateRTCTokenRequestMapper } from "./mappers/generate-rtc-token-request-mapper";

export const generateRTCToken = onRequest((request, response) => {
    const generateRTCTokenRequestMapper = new GenerateRTCTokenRequestMapper();

    const validateRequestResult = generateRTCTokenRequestMapper.validateRequest(request);

    response.status(validateRequestResult.statusCode).send(validateRequestResult.body);
});
