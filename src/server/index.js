const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()}: ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(express.static('dist'));

const routes = require('./routes');
routes.setupRoutes(app);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
