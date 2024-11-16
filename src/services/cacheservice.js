//const NodeCache = require("node-cache");
import NodeCache from 'node-cache'
class CacheService {
    /** Abstraction of in-memory storage */
    
    /** @type {NodeCache} */
    node_cache;
    
    constructor() {
        /** @type {NodeCache.Options} */
        const options = {};
        this.node_cache = new NodeCache(options);
    }
    
    /**
     * Save value to in-memory storage
     * @param {string} key 
     * @param {string} value
    */
    save(key, value) {
        this.node_cache.set(key, value);
    }
    /**
     * Get value from in-memory storage
     * @param {string} key
     * @returns {string}
     */
    getItem(key) {
        const value = this.node_cache.get(key);
        return value;
    }
}

module.exports = new CacheService(); // singleton behaviour
