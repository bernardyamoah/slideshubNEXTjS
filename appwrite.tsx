import { Client, ID, Databases,Storage, Account,Query } from 'appwrite';
const client= new Client()
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647a8fc613adfa0667f9');
    
const account= new Account(client)
const databases= new Databases(client)
const storage= new Storage(client)
export {client,account,databases,storage,ID,Query};