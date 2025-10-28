// imports and variables below ||

// import express. framework for building web servers in node.js
const express = require('express');

// mongoose is recommended, but in class it was done like this, so i'll practice with this for now
// if this becomes overwhelmingly annoying or i grow past it, ill switch to mongoose
// if that is a headache later then i deserve it
// this is an instance of MongoClient being used to connect to a cluster
const { MongoClient } = require('mongodb');

// cors. you need cors. (Cross-Origin Resource Sharing)
// by default browsers block frontend JS from talking to backend on a different origin (like different port)
// you can use cors to allow these requests, this will let my react frontend on the other port talk to this guy. huzzah
const cors = require('cors');
const { connectToDB, getDB } = require('./config/db');

// i have a local .env file as you know. this .env file is accessed here
// loads env variables into process.env object (down below)
require('dotenv').config();

// this creates an express ap. it defines routes, middlewares, and starts the server
const app = express();

// middleware is this and express.json
// this tells express to use cors middleware for all requests, so react is able to do its thing
app.use(cors());
// express does not automatically parse JSON. this helps
// this is what i understand the least currently, research later
app.use(express.json());


// ROUTES
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');



async function main() {

    // establish connection
    await connectToDB();
    const db = getDB();
    console.log(`Ready: ${db.databaseName}`);

    // temporary test route:
    app.get('/', (req, res) => {
        res.send("Server and DB connected successfully");
    });

    // external routes:
    app.use('/api/auth', authRoutes); // login and signup
    app.use('/api/posts', postRoutes); // post routes


    // start listening
    // listens for connections like GET, POST, PUT, etc
    // routes and middleware are like pipes, this is the faucet
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server running of port ${PORT}`));

}

main();
