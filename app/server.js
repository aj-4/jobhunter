const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const hookJWTStrategy = require('./services/passportStrategy');

const PORT = 3000;

const app = module.exports = express();

app.use(express.static(path.join(__dirname, '../client/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

hookJWTStrategy(passport);

app.use('/api', require('./routes/api')(passport));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '../../public/app/views/index.html'));
});

app.listen(PORT, () => console.log('Listening on port', PORT));
