// if you are looking at this for some reason, I understand these comments are redundant, I'm doing it for the sake of learning
// everything needed for encryption stuff
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');

// router for routes
const router = express.Router();

// given username and password, create the user in the database
router.post('/register', async(req, res) => {
    const db = getDB();
    const { username, password } = req.body;

    // input verification, i feel like i would do it in the front for this part but, practicing backend is good
    if(!username || !password) {
        return res.status(400).json({ error: 'Both fields are required'});
    }

    try {
        // check for existing user, return user exists error
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert the new user with the hashed password and name
        const result = await db.collection('users').insertOne({
            username,
            password: hashedPassword,
            admin: false
        })

        // if we get here it worked
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// given username and password, check if user exists and login
router.post('/login', async(req, res) => {
    const db = getDB();
    const { username, password } = req.body;

    // verification again, could be frontend but isnt, maybe its best to do both? ill learn later.
    if(!username || !password) {
        return res.status(400).json({ error: 'Both fields are required'});
    }

    // try to login with given credentials if they exists
    try {
        // check if the user even exists, if not go away
        const user = await db.collection('users').findOne({ username});
        if(!user) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        // if the user does exist, check if the password matches, if so come on in
        // using bcrypt for comparison
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        // defines user_id for use in jwt. honestly this a bit confusing to me still, gotta look into jwt
        const user_id = user._id;

        // create JWT
        // basically a digital signature. good practice
        // this signs the token, only the backend knows JWT_SECRET. so sneaky
        const token = jwt.sign(
            { id: user_id, username: user.username, admin: user.admin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // send response to frontend
        res.json({
            message: 'Login successful',
            user_id,
            token
        });

    // this is some kind of actual error, user stuff is handled up there
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
