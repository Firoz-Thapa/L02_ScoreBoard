import logger from '../controllers/log.controller.js';

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const entryMN = (req, res, next) => {
    const endpoint = req.baseUrl + req.path;
    logger.info(`Entry ${endpoint}`);
    next();
};

export default entryMN;