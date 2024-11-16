import { config } from 'dotenv';
config();

const PORT  = parseInt(process.env.PORT, 10)
const HOST  = process.env.HOST;
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}`;
const API_URL = `${BASE_URL}/api/v1`;
const LOG_LEVEL = parseInt(process.env.LOG_LEVEL, 10);

const CONF = {
    PORT,
    HOST,
    PROTOCOL,
    BASE_URL,
    API_URL,
    LOG_LEVEL
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
export default CONF;