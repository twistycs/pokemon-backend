const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8000;
const pathMongo = require("./config/key_local");
const pokemonApi = require("./api/routes/pokemon");

mongoose.connect(pathMongo.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
app.use(bodyParser.json({ limit: '50mb' })); //limit because add pokemon to mongodb
app.use('/pokemon', pokemonApi);

app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT);
});