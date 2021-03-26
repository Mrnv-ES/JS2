const express = require('express');
const fs = require('fs');
const app = express();
const basket = require('./basketRouter');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/basket', basket);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));