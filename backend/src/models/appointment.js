import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: true
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Doctor',
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	prescription: {
		type: String,
	},
	remarks: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Scheduled', 'Completed', 'Cancelled'],
		default: 'Pending'
	},
	type: {
		type: String,
		required: true,
		enum: ['Consultation', 'Follow-Up', 'Surgery', 'Screening']
	}

}, {timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
