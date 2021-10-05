require('../../dotenv');
const logger = require('../core/logger');
const { usersRouter } = require('./endpoints');
const express = require('express');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(router);

router.use('/users', usersRouter);

app.listen(process.env.HTTP_PORT, () => {
    logger.info(`App running on http://localhost:${process.env.HTTP_PORT}`);
});
