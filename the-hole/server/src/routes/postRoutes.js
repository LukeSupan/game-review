// if you are looking at this for some reason, I understand these comments are redundant, I'm doing it for the sake of learning
// everything needed for encryption stuff
const express = require('express');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// middleware
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

// router for routes
const router = express.Router();

// get posts from DB (all)
// unprotected. idc who sees my posts
router.get('/', async(req, res) => {
    const db = getDB();

    // go into the DB, get the posts, return them
    try {
        // find them, sort them by date (which is stored as ID), make posts an array
        const posts = await db.collection('posts')
                .find()
                .sort({ _id: -1 })
                .toArray();

            res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get posts' });
    }
});

// create a post given a title, body (admin)
router.post('/', auth, adminCheck, async(req, res) => {
    const db = getDB();
    const { title, body } = req.body;

    // input verification
    if(!title) {
        return res.status(400).json({ error: 'A title is required'});
    }

    // try to create a new post, if it fails delete it. make the updatedAt date the createdAt date because its new
    try {
        const adminId = req.user.id;
        const adminName = req.user.username;


        const result = await db.collection('posts').insertOne({
            title,
            body,
            createdAt: new Date(),
            updatedAt: new Date(),
            adminId,
            adminName
        });

        const createdPost = await db.collection('posts').findOne({ _id: result.insertedId });

        res.status(201).json(createdPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// update a post givent the post (admin)
router.put('/:id', auth, adminCheck, async(req, res) => {
    const db = getDB();
    const { id } = req.params;
    const { title, body } = req.body;

    // input verifcation
    if(!title) {
        return res.status(400).json({ error: 'A title is required'});
    }

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Post ID' });
    }

    try {
        await db.collection('posts').updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, body, updatedAt: new Date() } }
        );

        const updatedPost = await db.collection('posts').findOne({ _id: new ObjectId(id) }); 

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update post' });
    }
});


// delete a post given the post (admin)
router.delete('/:id', auth, adminCheck, async (req, res) => {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Post ID' });
    }

    try {
        await db.collection('posts').deleteOne(
            { _id: new ObjectId(id) }
        );

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});


module.exports = router;
