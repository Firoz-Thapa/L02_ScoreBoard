import express from 'express';
import apiV1 from './routes/v1/router.js'
import entryMN from './middlewares/entry.middleware.js';

const app = express();

app.use(entryMN)
//GET http://localhost:3000/
app.get('/', (req, res) => {
    res.send("Welcome to the Scoreboard REST API");
});

app.use('/api/v1', apiV1);

export default app;