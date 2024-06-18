import jwt from "jsonwebtoken";

export function decodeJWT(token) {
    try {
        const modifiedToken = token.startsWith("TZDJWT ") ?
            token.slice("TZDJWT ".length) : token;
        const decoded = jwt.decode(modifiedToken);
        return decoded;
    } catch (error) {
        return null;
    }
}
