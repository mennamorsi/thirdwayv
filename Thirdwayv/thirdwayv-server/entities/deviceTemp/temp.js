const mongoose = require('mongoose');

const Temp = mongoose.Schema({
  device      : { type: 'ObjectId', ref: 'Device' },
  temp        : { type: Number },
  updatedAt   : { type: Date, default: Date.now },
  createdAt   : { type: Date, default: Date.now },
})

Temp.pre('save', function (next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('Temp', Temp);


