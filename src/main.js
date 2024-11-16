import service from './service.js';
import CONF from './config.js';
console.log("REST API service starting.");

service.listen(CONF.PORT, CONF.HOST, () => {
    console.log("Listening: " + CONF.BASE_URL);
});
