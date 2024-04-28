import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {Schema} = mongoose;

const patientSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim:true
	},
	lastName: {
		type: String,
		required: true,
		trim:true
	},
	username: {
		type: String,
		required: true,
		// unique: true,
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
	age: {
		type: String,
		required: true,
	},
	aadharNumber: {
		type: String,
		required: true,
		// unique: true,
		validate: {
			validator: function (v) {
				return /^\d{12}$/.test(v); // Ensures exactly 12 digits
			},
			message: props => `${props.value} is not a valid Aadhar number!`
		},
		maxLength: 12 // Redundant if validation ensures length, but included as a safeguard
	},
	address: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Other'],
		required: true
	}, dob: {
		type: Date,
		required: true
	},
	appointments:[
		{
			type: Schema.Types.ObjectId,
			ref: 'Appointment'
		}

	]
}, {timestamps: true});


patientSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
}

patientSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			username: this.username,
			email: this.email,
			firstName: this.firstName,
			aadharNumber: this.aadharNumber,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};


patientSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
}


const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
