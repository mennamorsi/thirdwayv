/** Require dependencies */
require('dotenv').config()
const config        = require("./config/index.config")
const express       = require('express');
const bodyParser    = require("body-parser");
const cors          = require('cors');
const morgan        = require('morgan')
const mongo         = require('./dbs/mongo')();
const app           = express();
const mainRoutes    = require('./routes/index')
const chalk         = require("chalk")

/** Express settings */
global.__basedir = __dirname;
app.use(cors({ origin: '*' }));
app.use(morgan(chalk.gray(`
    Method: :method 
    URL: :url
    Status: :status
    Respone-time: :response-time`)
  ));
app.use('/public', express.static('public'))
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/** Starting server */
app.listen(config.dotEnv.PORT, () => {
  console.log(chalk.blue(`🕸️  Third way server is live on: http://localhost:${config.dotEnv.PORT}`))
});

/** Initiate routes */
mainRoutes.initRoutes(app)

/** test Handler */
app.get('/',(req, res )=> {
  res.send("Application is up running")
});

/** 404 Handler */
app.use((req, res )=> {
  res.send("Not Found")
});