// imports and variables below ||

// import express. framework for building web servers in node.js
const express = require('express');

// mongoose is recommended, but in class it was done like this, so i'll practice with this for now
// if this becomes overwhelmingly annoying or i grow past it, ill switch to mongoose
// if that is a headache later then i deserve it
const { MongoClient, ObjectId } = require('mongodb');

// cors. you need cors. (Cross-Origin Resource Sharing)
// by default browsers block frontend JS from talking to backend on a different origin (like different port)
// you can use cors to allow these requests, this will let my react frontend on the other port talk to this guy. huzzah
const cors = require('cors');

// i have a local .env file as you know. this .env file is accessed here
// loads env variables into process.env object (down below)
require('dotenv').config();

// this creates an express ap. it defines routes, middlewares, and starts the server
const app = express();

// this tells express to use cors middleware for all requests, so react is able to do its thing
app.use(cors());

// express does not automatically parse JSON. this helps
// this is what i understand the least currently, research later
app.use(express.json());

// read the variable in for the URI
const uri = process.env.MONGO_URI;

// read the database name in using DB_NAME
const dbName = process.env.DB_NAME;

// stores the database connection once established
let db;

// TODO add actual database connection
