const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const cars = require('./routes/muscleCars')
require("dotenv").config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(cars);

app.listen(process.env.PORT, async function () {
    console.log(`API running on port ${process.env.PORT}`);
});