An Agora RTC Token Server Firebase Cloud Function.

This Cloud Function is a 2nd gen HTTPS callable function that can be called by any client as a conventional HTTP request. The `cd functions/src` is divided into several parts:
- `index.js` which is the entry point of the Cloud Function
- The `mappers` directory which is the next execution point. Mappers validate data from `index.js` before passing them on to `handlers`
- `handlers` which is the final execution point. This is where the actual stuff is done. If the clients' request gets to this point and execution goes through successfully the response is computed here and sent back to the client
- `models` which may hold models and/or DTO's and DAO's
- `enums` which hold important enums

## Getting started
Check out the official Firebase docs at https://firebase.google.com/docs/functions on an introduction to Firebase Cloud Functions if you're new here. Also see https://firebase.google.com/docs/functions/get-started?gen=2nd on how to get started with seeting up and connecting with Firebase Cloud Functions to a Firebase project