import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";


export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) throw createHttpError(401, 'Please provide Authorization header');

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw createHttpError(401, 'Auth header should be of type Bearer');

    const session = SessionsCollection.findOne({ accessToken: token });

    if (!session) throw createHttpError(401, 'Session not found');

    const isAccesTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (!isAccesTokenExpired) throw createHttpError(401, 'Access token expired');

    const user = await UsersCollection.findById(session.userId);

    if (!user) throw createHttpError(401);

    req.user = user;

    next();
};