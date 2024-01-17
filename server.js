const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');
const mongodb = require('./data/database')

const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use('/', routes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => { 
            console.log(`Database is listening and node running on port ${port}`)
        });
    }
});

