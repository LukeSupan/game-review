const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ error: 'No token'});
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const db = getDB();
        const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });


        if(!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = auth;
