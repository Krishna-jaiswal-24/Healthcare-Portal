import Doctor from "../../models/doctor.js";
import Appointment from "../../models/appointment.js";

const getPatients = async (req, res) => {
	const { doctorId } = req.params;

	if (!doctorId) {
		return res.status(400).json({ message: "Doctor Id required" });
	}

	try {
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		// Use aggregation to ensure no duplicate patient entries
		const patientsAggregation = await Appointment.aggregate([
			{ $match: { doctor: doctor._id } },
			{ $group: { _id: "$patient" } }, // Group by patient ID to avoid duplicates
			{ $lookup: { // Replace with a join on the Patients collection
					from: "patients", // This should match your collection name for patients
					localField: "_id",
					foreignField: "_id",
					as: "patientDetails"
				}},
			{ $unwind: "$patientDetails" }, // Unwind the array to get objects
			{ $project: { // Select only the fields you need
					_id: 1,
					firstName: "$patientDetails.firstName",
					lastName: "$patientDetails.lastName",
					email: "$patientDetails.email",
					phone: "$patientDetails.phone",
				}}
		]);

		const numberOfPatients = patientsAggregation.length;
		return res.json({
			message: `All Patients and number of patients: ${numberOfPatients}`,
			patients: patientsAggregation
		});
	} catch (error) {
		console.error(error); // Log the error for debugging
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default getPatients;
