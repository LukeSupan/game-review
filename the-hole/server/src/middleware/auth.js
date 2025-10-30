// auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // get the authHeader from the request
    const authHeader = req.header('Authorization');

    // check if the header exists
    if (!authHeader) {
        // if it does not:
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // check the bearers token. if its weird let em know
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Weird Token' });
    }

    // get the token part
    const token = tokenParts[1];

    try {
        // verify with JWT_SECRET
        // if it fails go to catch
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // since the token is valid attach the payload
        req.user = decoded;
        
        // call next to pass control
        next();
    } catch (ex) {
        // if verification fails:
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = auth;
