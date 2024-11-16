#!/bin/bash

npm init -y
git init


npm install --save express winston dotenv node-cache
npm install --save-dev mocha chai nyc

touch .env.example
touch rest.http
touch readme.md
touch .gitignore

mkdir src
touch src/main.js
touch src/service.js
touch src/config.js

mkdir src/controllers
touch src/controllers/log.controller.js

mkdir src/middlewares
touch src/middlewares/entry.middleware.js
touch src/middlewares/json_security.js

mkdir src/routes
mkdir src/routes/v1
touch src/routes/v1/router.js
touch src/routes/v1/scoreboard.js


mkdir test
