const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

router.get('/', (req, res) => {
    fs.readFile('server/db/userBasket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userBasket.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userBasket.json');
});
router.delete('/:id', async (req, res) => {
    handler(req, res, 'delete', 'server/db/userBasket.json');
});

module.exports = router;