import Patients from "../../models/patients.js";
import Appointment from "../../models/appointment.js";

export const getPatientAppointments = async (req, res) => {
	try {
		const patientId = req.params.patientId;
		const patient = await Patients.findById(patientId);
		if (!patient) {
			return res.status(404).json({message: "Patient not found"});
		}

		// Correctly query appointments using 'patient' field as a reference
		const appointments = await Appointment.find({patient: patient._id})
			.populate('doctor', 'firstName lastName')
			.select("-password -email -aadharNumber -qualification -phone -address -license");
		// 'doctor' needs to be populated

		if (appointments.length === 0) {  // Check if the array is empty
			return res.status(404).json({message: "No appointments found"});
		}

		res.status(200).json({
			message: "Appointments found", appointments: appointments.map(appointment => ({
				_id: appointment._id,
				doctor: appointment.doctor._id,
				doctorName: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
				date: appointment.date,
				time: appointment.time,
				consultation: appointment.consultation,
				prescription:appointment.prescription,
				createdAt: appointment.createdAt,
				updatedAt: appointment.updatedAt,
				remarks: appointment.remarks,
			}))
		});
	} catch (e) {
		console.error(`Error in getting patient appointments: ${e.message}`);
		return res.status(500).json({message: "Server Error", error: e.message});
	}
}
