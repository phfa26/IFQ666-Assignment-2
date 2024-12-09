const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Access token required.' });

    // Split 'Bearer <token>' to get the token part
    const token = authHeader.split(' ')[1]; // 'Bearer <token>' -> [Bearer, <token>]

    if (!token) return res.status(401).json({ error: 'Token missing.' });

    // Verify the token using JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If the token is expired, send a specific error
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired. Please log in again.' });
            }
            // For other errors like invalid token
            return res.status(403).json({ error: 'Invalid token.' });
        }

        req.user = user;  // Attach decoded user info to the request object
        next();  // Call the next middleware/route handler
    });
}

module.exports = authenticateToken;
