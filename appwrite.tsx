import { Client, ID, Databases,Storage, Account,Query,Avatars,Teams } from 'appwrite';
const client= new Client()
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647a8fc613adfa0667f9');
    
const account= new Account(client)
const databases= new Databases(client)
const storage= new Storage(client)
const avatars = new Avatars(client);
const teams = new Teams(client);

export {client,account,databases,storage,ID,Query,avatars,teams};