import Appointment from "../../models/appointment.js";

const updateAppointment = async (req, res) => {
	const { appointmentId } = req.params;
	const { prescription, remarks, reason, tests, status } = req.body;

	if (!appointmentId) {
		return res.status(400).json({ message: "Appointment Id required" });
	}

	try {
		const updatedAppointment = await Appointment.findByIdAndUpdate({ _id: appointmentId }, {
			prescription,
			remarks,
			reason,
			tests,
			status
		}, { new: true });

		if (!updatedAppointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		res.json(updatedAppointment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to update appointment" });
	}
};

export default updateAppointment;
