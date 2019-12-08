const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT);
});