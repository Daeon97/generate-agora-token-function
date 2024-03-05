An Agora RTC Token Server Firebase Cloud Function.

This Cloud Function is a 2nd gen HTTPS callable function that can be called by any client as a conventional HTTP request. The `functions/src` directory is divided into several parts. In order of program flow:
- `index.ts` which is the entry point of the Cloud Function. Data received from the client is forwarded to the appropriate `mapper`
- `mappers` which validate and map the request to the appropriate `validator`
- `validators` which validate and forward the data received from the client to the appropriate `generator`
- `generators` which is the final execution point. This is where the actual stuff is done. If the clients' request gets to this point the resource is created and a response is computed and sent back to the client
- `models` which may hold models and/or DTO's and DAO's
- `enums` which hold important enums

## Getting started
Check out the official Firebase docs at https://firebase.google.com/docs/functions on an introduction to Firebase Cloud Functions if you're new here. Also see https://firebase.google.com/docs/functions/get-started?gen=2nd on how to get started with setting up and connecting with Firebase Cloud Functions to a Firebase project. In order to use this function you will need to get your own app ID and certificate. To get started, [https://www.agora.io/en/](create an account with Agora), log into the Agora console, create a new project and copy your projects' app ID and primary certificate into your Cloud Functions environment. See [https://firebase.google.com/docs/functions/config-env?gen=2nd](configure your environment) for instructions on how to set up an environment for Cloud Functions

## Making the request
The only supported request method is `POST`. This is because the request to generate an RTC token is meant to collect some data from the client and create a resource- an RTC token in this case. If you try to make any other type of request you will get a `405`. The `POST` request expects a body. If you do not specify one you will get a `400`. The request body should contain:
- A required `userId`. Any `integer` within the range of 1 (inclusive) to 100 (inclusive)
- A required `channelName`. Any `String` comprising any combination of letters a-z, A-Z, digits 0-9 and special characters "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~" and ","
- An optional `tokenExpirationSeconds`. Any `integer` within the range of 300 (inclusive) to 86400 (inclusive). Defaults to 86400 if not specified

Failure to abide by any of these contraints in your request will either lead to a `400`, `412` or `500`. Ofcourse, you are free to modify this function to suit your needs. See [LICENSE](https://github.com/Daeon97/agora-token-server-function?tab=MIT-1-ov-file)

## Request
`POST` `http://<ADDRESS>/<PROJECT>/<REGION>/generateRTCToken`

`{
    "userId": 10,
    "channelName": "a!~7."
}`

## Response
`{
    "token": "Some token here",
    "userId": 10,
    "channelName": "a!~7.",
    "tokenExpirationSeconds": 86400,
    "privilegeExpirationSeconds": 86400
}`