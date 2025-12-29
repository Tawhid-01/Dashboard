const checkRole = (role) => {
    return (req, res, next) => {
        // req.user is set by your authMiddleware.js
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ 
                message: `Access Denied: ${role} role required.` 
            });
        }
    };
};

module.exports = checkRole;