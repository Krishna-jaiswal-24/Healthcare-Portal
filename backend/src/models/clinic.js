import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	workingDays: {
		type: String,
		enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	},
	services: [{
		type: String,
		required: true
	}]
});

const Clinic = mongoose.model('Clinic', clinicSchema);
export default Clinic;
