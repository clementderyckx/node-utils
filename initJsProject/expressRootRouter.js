const express = require('express');
const rootRouter = express.Router();


rootRouter.get('/', (req, res, next) => {
    res.send('App is started');
});

module.exports = rootRouter;