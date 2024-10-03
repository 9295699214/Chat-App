import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    const token = request.cookies.jwt;

    if (!token) {
        return response.status(401).send("Access Denied. Not authentication.");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);  // verify the token
        request.userId = verified.userId;  // attach the verified token data to the request object
        next();  // proceed to the next middleware
    } catch (error) {
        return response.status(403).send("Invalid Token.");
    }
};