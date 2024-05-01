import mongoose,{Schema} from "mongoose";

const doctorSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		}
	},
	phone: {
		type: String,
		required: true,
	},
	aadharNumber: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{12}$/.test(v); // Ensures exactly 12 digits
			},
			message: props => `${props.value} is not a valid Aadhar number!`
		},
		maxLength: 12 // Redundant if validation ensures length, but included as a safeguard
	},
	qualification: {
		type: String,
		required: true,
	},
	license: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true
	},
	hospital: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hospital',
	},
	appointments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Appointment'
		}],
},{timestamps: true});


const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;