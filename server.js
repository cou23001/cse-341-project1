/*
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');
const mongodb = require('./data/database')

const port = process.env.port || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
    next();
});

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

*/

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', routes);

const db = require('./models');

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


