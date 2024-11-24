import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token; // Assuming you're using cookies to store the JWT
    if (!token) {
        return res.status(401).json({ msg: 'Unauthenticated - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to the req object
        req.userId = decoded.userId;  // Make sure the payload contains userId

        next(); // Move to the next middleware or route
    } catch (error) {
        console.error("Error in token verification:", error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired, please log in again.' });
        }
        
        return res.status(401).json({ msg: 'Token verification failed: ' + error.message });
    }
};
