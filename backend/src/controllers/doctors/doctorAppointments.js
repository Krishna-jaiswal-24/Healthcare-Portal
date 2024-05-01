import Doctor from "../../models/doctor.js";
import Appointment from "../../models/appointment.js";

const getDoctorAppointments = async (req, res) => {
	try {
		const doctorId = req.params.doctorId;
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			return res.status(404).json({message: "Doctor not found"});
		}

		const appointments = await Appointment.find({doctor: doctor._id})
			.populate('patient', 'firstName lastName')
			.select("-password -email -aadharNumber -qualification -phone -address");

		if (appointments.length === 0) {
			return res.status(404).json({message: "No appointments found"});
		}

		res.status(200).json({
			message: "Appointments found", appointments: appointments.map(appointment => ({
				_id: appointment._id,
				patient: appointment.patient._id,
				patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
				date: appointment.date,
				time: appointment.time,
				consultation: appointment.consultation,
				prescription: appointment.prescription,
				createdAt: appointment.createdAt,
				updatedAt: appointment.updatedAt,
				remarks: appointment.remarks,
			}))
		})
	} catch
		(e) {
		console.error(`Error in getting patient appointments: ${e.message}`);
		return res.status(500).json({message: "Server Error", error: e.message});
	}

}

export default getDoctorAppointments;