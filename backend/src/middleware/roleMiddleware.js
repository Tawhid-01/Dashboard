const checkRole = (roles) => {
    return (req, res, next) => {
        // Convert a single string to an array so the logic works for both
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        // Check if the user's role is in the list of allowed roles
        if (req.user && allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ 
                message: `Access Denied: One of these roles required: ${allowedRoles.join(', ')}` 
            });
        }
    };
};

module.exports = checkRole;