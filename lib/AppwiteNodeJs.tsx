const { ID, Users } = require('node-appwrite');
const sdk = require('node-appwrite');

// Init SDK
const client = new sdk.Client();

const users = new Users(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('647a8fc613adfa0667f9') // Your project ID
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY) // Your secret API key
    .setSelfSigned()
;



export {users}