const basket = require('./basket');
const fs = require('fs');

const actions = {
    add: basket.add,
    change: basket.change,
    delete: basket.del
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let newBasket = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newBasket, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
};

module.exports = handler;