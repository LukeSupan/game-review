// after auth.js runs, check for admin if needed
const adminCheck = (req, res, next) => {

    // check for authentication first
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // check for admin status
    if (!req.user.admin) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    next();
};

module.exports = adminCheck;
