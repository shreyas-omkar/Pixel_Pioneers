import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookeies = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { 
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',  // Loosen for development
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === 'production' // Ensure HTTPS in production
    });

    return token;
}