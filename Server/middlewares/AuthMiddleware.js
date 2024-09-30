import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    const token = request.cookies.jwt;
    console.log({token});

    if (!token) {
        return response.status(401).send("Access Denied. No token provided.");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);  // verify the token
        request.user = verified;  // attach the verified token data to the request object
        next();  // proceed to the next middleware
    } catch (error) {
        return response.status(400).send("Invalid Token.");
    }
};