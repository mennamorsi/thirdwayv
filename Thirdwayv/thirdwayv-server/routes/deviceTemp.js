/** costants */
const router           = require('express').Router();
const deviceTempOps    = require("../entities/deviceTemp/deviceTemp.op");

/** Endpoints */
router.post('/addTemp', deviceTempOps.addTemp)
router.get('/getAllDevices', deviceTempOps.getAllDevices)
router.post('/getTempsByDevId', deviceTempOps.getTempsByDevId)

/** Importing endpoints */
module.exports = router;
