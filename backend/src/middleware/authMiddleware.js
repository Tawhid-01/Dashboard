const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // This 'decoded' object must contain the user's ID and permissions
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = auth;

