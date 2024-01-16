const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
	{
		PhoneNumber:{
			type:Number
		},
		PickupLocation: {
			type: String,
		},
		DropoffLocation: {
			type: String,
		},
		Date: {
			type: String,
		},
		Time: {
			type: String,
		},
    }
);

module.exports = mongoose.model("cabSchema", cabSchema);