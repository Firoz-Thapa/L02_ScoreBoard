//const express = require("express");
import express from "express"
const ScoreboardController = require("../../controllers/scoreboard.controller");

const routes = express.Router();

routes.get("/scoreboard", (req, res) => {
    const scores = ScoreboardController.getScores();
    res.json({
        title: "leaderboard",
        scores
    });
});

routes.post("/scoreboard", (req, res) => {
    try {
        ScoreboardController.updateScores(req.body.score);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({msg: "failed"});
        return;
    }
    res.json({msg: "ok"});
});

routes.delete("/scoreboard", (req, res) => {
    try {
        ScoreboardController.reset(req);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({msg: "failed"});
        return;
    }
    res.json({msg: "ok"});
});

module.exports = routes;
