import logger from "../controllers/log.controller.js";

/**
 * 
 * @param {import("express").ErrorRequestHandler} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const json_security = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.warn(`Invalid JSON from: ${req.ip}`);
        return res.sendStatus(400);
    }
    next();
};

export default json_security;

