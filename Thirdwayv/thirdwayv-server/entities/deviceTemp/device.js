const mongoose = require('mongoose');

const Device = mongoose.Schema({
	deviceId  	: { type: String, index: true },
	lastTemp	: { type: Number },
	updatedAt   : { type: Date, default: Date.now },
	createdAt   : { type: Date, default: Date.now },
});

Device.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('Device', Device);

