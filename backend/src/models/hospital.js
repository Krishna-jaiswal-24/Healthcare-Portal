import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
	hospitalName: {
		type: String,
		required: true,
	},
	hospitalAddress: {
		type: String,
		required: true,
	},
	hospitalPhone: {
		type: String,
		required: true,
	},
	workingDays: {
		type: String,
	},
	emergencyServices: {
		type: Boolean,
		required: true
	},
	NIN2HFI:{
		type: String,
		required: true,
	}
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;