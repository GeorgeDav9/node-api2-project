const express = require('express');

const apiRouter = require('./api-router.js');

const server = express();

server.unsubscribe(express.json());

// endpoints with /api
server.use('/api', apiRouter);

server.get("/", (req, res) => {
    res.send(`
    Posts and Comments
    `);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})