import express from "express";
import json_security from "../../middlewares/json_security.js";
const router =express.Router();

router.use(express.json());
router.use(json_security);
// http://localhost:3000/api/v1
router.get('', (req, res) => {
    res.json({msg: "api endpoint", version: 1});
});

//POST http://localhost:3000/api/v1/data
router.post('/data', (req, res) => {
    
    console.log(req.body);
    res.json({msg: "OK"});
});

export default router;