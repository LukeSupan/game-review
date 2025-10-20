// mongoose is recommended, but in class it was done like this, so i'll practice with this for now
// if this becomes overwhelmingly annoying or i grow past it, ill switch to mongoose
// if that is a headache later then i deserve it
// this is an instance of MongoClient being used to connect to a cluster
const { MongoClient } = require('mongodb');

// i have a local .env file as you know. this .env file is accessed here
// loads env variables into process.env object (down below)
require('dotenv').config();

// make general variables so they can be reused
let client;
let db;

// we call this is server.js to connect
async function connectToDB() {
    // read .env
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    // create client
    client = new MongoClient(uri);



    // try to connect to the database
    try {
        // attempt connection
        await client.connect();
        db = client.db(dbName);

    } catch (e) {
        console.error(e);
        console.error("Failed to connect:", e)
    } 
}

// helper to get database in other files
function getDB() {
    return db;
}

// helper to close connection
async function closeDB() {
    if (client) await client.close();
}

module.exports = { connectToDB, getDB, closeDB };

