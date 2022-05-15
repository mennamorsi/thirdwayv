/** Requiring routes */
const deviceTempRoutes     = require('./deviceTemp');

/** Initiating routes */
const initRoutes = (app)=>{
  app.use(deviceTempRoutes)
}

/** Importing routes */
module.exports = { initRoutes };
