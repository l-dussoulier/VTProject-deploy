import express from 'express';
import fs = require('fs');

const assetsRouter = express.Router();

/**
 * Get json informations from NFT id
 */
 assetsRouter.get('/api/json/:id', async (req, res) => {
    try {
        const data = fs.readFileSync('public/json/' + req.params.id + '.json');
        res.send(JSON.parse(data.toString()))
    } catch (e) {
        res.status(404).send(e);
    }
});

/**
 * Get image from NFT id
 */
assetsRouter.get('/api/images/:id', async (req, res) => {
    try {
        fs.readFile('public/images/' + req.params.id + '.png', function (err, data) {
            if (err) throw err
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(data)
        })
    }
    catch (e) {
        res.status(404).send(e);
    }
})

export { assetsRouter };