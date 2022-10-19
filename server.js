const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

require('./routes/muscleCars')(app);

app.listen(8000, async function () {
    console.log('API running on port 8000');
});