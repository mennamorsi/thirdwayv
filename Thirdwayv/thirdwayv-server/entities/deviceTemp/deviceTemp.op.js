const config                = require("../../config/index.config")
const Rd                    = require("../../helpers/Responser")
const chalk                 = require("chalk")
const { nanoId }            = require("nanoid")
const Temp                  = require("./temp")
const Device                = require("./device")

const addTemp = async (tempObject) => {
    const temp      = tempObject.temp
    const deviceId  = tempObject.deviceId

    /** validation of data */
    if (!deviceId || !temp) {
      console.log(chalk.red("*** Invalid request body ***"))
      return false;
    }

    try {
      /** check if device exists */
      let device = null;
      let deviceExist = await Device.findOne({ deviceId: deviceId }).exec();

      if(!deviceExist){
        let newDevice = await  new Device({ 
          deviceId: deviceId,
          lastTemp: temp,
        });

        let createdDevice = await newDevice.save();
        if (!createdDevice){
          console.log(chalk.red(err))
          return false;
        }
        console.log(chalk.blue("*** New device created ***", device));
        device = createdDevice;

      }else{
        let deviceUpdated = await Device.findOneAndUpdate({ deviceId: deviceId }, {lastTemp: temp}, { new: true }).exec();
        device = deviceUpdated
      }
      
      /** add new temp */
      let newTemp = await new Temp({ device: device._id, temp: temp });

      await newTemp.save(async (err, temp) => {
        if (err){
          console.log(chalk.red(err))
         return false;
        }else{
          console.log(chalk.blue("*** New temp recorded ***", temp));
        }
      });

      console.log(chalk.green("*** New temprature recorded successfully ***"))
      return true;
    } catch (error) {
      console.log(chalk.red("*** Error recording a new temprature ***"))
      console.log(error)
      return false;
    }
}

module.exports = {
  
  async addTemp (req, res) {
    const data      = req.body
    const devices   = data.devices
    const errorArr  = []
    for (let i = 0; i < devices.length; i++) {
      const deviceObj = devices[i];
      let res = await addTemp(deviceObj);
      if(!res) errorArr.push(deviceObj);
    }
    
    if(errorArr.length == 0)
      return(new Rd(res).success('the proccess done successfully').setData({ devices:devices }).send())
    else if(errorArr.length == devices.length)
      return(new Rd(res).error("the proccess failed").setData({ devices:devices }).send())
    else
      return(new Rd(res).success("").setData({'failed to add':errorArr }).send())

  },

  async getAllDevices (req, res) {
    /** get all devices */
    try {
      let devices = await Device.find({}).exec();
      console.log(chalk.green("*** All devices fetched successfully ***"))
      return(new Rd(res).success('All devices fetched successfully').setData({devices}).send())
    } catch (error) {
      console.log(chalk.red("*** Error getting devices ***"))
      console.log(error)
      return(new Rd(res).error("Error getting devices").setData({error}).send())
    }
  },

  async getTempsByDevId (req, res) {
    const data      = req.body
    const deviceId  = data.deviceId
    
    /** validation of data */
    if (!deviceId) {
      console.log(chalk.red("*** Invalid request body ***"))
      return(new Rd(res).error("Invalid request body").setData({ error: "device id  is required" }).send())
    }
    
    try {
      /** get device temps logic */
      const dev = await Device.findOne({ deviceId: deviceId }).exec();
      if (!dev) {
        console.log(chalk.red("*** Device not found ***"))
        return(new Rd(res).error("Device not found").setData().send())
      }

      let temps = await Temp.find({ device: dev._id }).exec();

      if(temps.length != 0){
        console.log(chalk.green("*** Temprature records fetched successfully ***"))
        return(new Rd(res).success('Temprature records fetched successfully').setData({ temps }).send())
      }else{
        console.log(chalk.green("*** No records found ***"))
        return(new Rd(res).success('No recordes found').setData({ temps }).send())
      }
    } catch (error) {
      console.log(chalk.red("*** Error fetching temp records ***"))
      console.log(error)
      return(new Rd(res).error("Error fetching temprature records").setData({error}).send())
    }
  },
  
}