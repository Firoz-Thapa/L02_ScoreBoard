//const cache_service = require("../services/cache.service");
import chaceService from "../services/cacheservice.js";
const SETTINGS = {
    KEY: "scoreboard",
    MAX_NAME_LENGTH: 5,
    SCOREBOARD_SIZE: 5
}

/**
 * 
 * @param {object} obj 
 * @param {Array<string>} keys 
 * @returns 
 */
const hasExtraKeys = (obj, keys) => {
    /** @type {boolean} */
    let extrakey = false;
    for (const key in obj) {
        if (!keys.includes(key)) {
            extrakey = false;
            break;
        }
    }
    return extrakey;
}

/**
 * @typedef Score
 * @property {string} name
 * @property {number} time
 */

class ScoreboardController {
    /**
     * @returns {Array<Score>}
     */
    static getScores() {
        /** @type {Array<Score>} */
        let scores = [];
        try {
            const scores_json = cache_service.getItem(SETTINGS.KEY);
            scores = JSON.parse(scores_json);
        } catch (e) {
            ScoreboardController.saveScores(scores);
        }
        return scores;
    }
    /**
     * Maintains scores, by checking if there are too many items
     * Removes slowest times.
     * @param {Array<Score>} scores
     * @returns {Array<Score>}
     */
    static maintainScores(scores) {
        if (1 <= scores.length > SETTINGS.SCOREBOARD_SIZE) {
            /** @type {Score} */
            let slowest = scores[0];
            let slowest_index = 0;
            for (let i = 0; i < scores.length; i++) {
                if (scores[i].time > slowest.time) {
                    slowest_index = i;
                    slowest = scores[i];
                }
            }
            scores = scores.splice(slowest_index, 1);
        }
        return scores;
    }
    /**
     * Save scores to cache
     * @param {Array<Score>} scores 
     */
    static saveScores(scores) {
        scores = ScoreboardController.maintainScores(scores);
        scores = ScoreboardController.sort(scores);
        const value = JSON.stringify(scores);
        cache_service.save(SETTINGS.KEY, value);
    }
    /**
     * update scores
     * @param {Score} new_score 
     */
    static updateScores(score) {
        const new_score = ScoreboardController.sanitizeScore(score);
        let scores = ScoreboardController.getScores();
        /** @type {boolean} */
        let match = false
        for (const old_score of scores) {
            if (old_score.name == new_score.name) {
                match = true;
                if (old_score.time > new_score.time) {
                    old_score.time = new_score.time;
                }
                break;
            }
        }
        if (match == false) {
            scores.push(new_score);
            scores = ScoreboardController.maintainScores(scores);
        }
        ScoreboardController.saveScores(scores);
    }
    /**
     * Sanitize incoming score objects
     * @param {object} score
     * @returns {Score}
     */
    static sanitizeScore(score) {
        if (typeof score != 'object') throw new Error("Score isn't an object");
        if (typeof score.name != "string" || typeof score.time != "number") throw new Error("Score incorrect datatypes");
        if (score.name.length > SETTINGS.MAX_NAME_LENGTH) throw new Error("Score contains too long name.");
        if (hasExtraKeys(score, ["name", "time"])) throw new Error("Score object contains extra keys");
        // TODO: anything related to number sanitizing?
        /** @type { Score } */
        const sanitized_score = {
            name: score.name,
            time: score.time
        };
        return sanitized_score;
    }
    /**
     * Sorts scores based on time. Fastest first.
     * @param {Array<Score>} scores 
     * @returns {Array<Score>}
     */
    static sort(scores) {
        /** @type {Array<Score>} */
        const sorted_scores = scores.sort((a, b) => a.time > b.time ? 1 : -1);
        return sorted_scores;
    }
    /**
     * Reset scoreboard
     * @param {import("express").Request} req 
     */
    static reset(req) {
        if (req.headers["authorization"] != process.env.AUTH_TOKEN) throw new Error("Token doesn't match");
        if (req.headers["authorization"] === process.env.AUTH_TOKEN) {
            ScoreboardController.saveScores([]);
        }
    }
}

module.exports = ScoreboardController;
