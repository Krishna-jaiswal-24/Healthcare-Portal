import Appointment from "../../models/appointment.js";

export const getAppointment = async (req, res) => {
	const {appointmentId} = req.params;

	if (!appointmentId) {
		return res.status(400).json({message: "Appointment Id required"});
	}

	try {
		const appointment = await Appointment.findById(appointmentId).populate('doctor', 'firstName lastName');

		if (!appointment) {
			return res.status(404).json({message: "Appointment not found"});
		}

		const desiredData = {
			_id: appointment._id,
			doctor: appointment.doctor._id,
			doctorName: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
			date: appointment.date,
			prescription: appointment.prescription,
			createdAt: appointment.createdAt,
			updatedAt: appointment.updatedAt,
			remarks: appointment.remarks,
			reason:appointment.reason,
		};

		return res.status(200).json({appointment: desiredData});
	} catch (error) {
		console.error(error); // Log the error for debugging
		return res.status(500).json({message: "Internal server error"});
	}
};