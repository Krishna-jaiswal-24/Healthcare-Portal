import Patients from "../../models/patients.js";

const getPatientByUsername= async (req, res) => {
	const {username} = req.params;

	if (!username) {
		return res.status(400).json({message: "Patient Id required"});
	}

	try {
		const patient = await Patients.findOne({username});

		if (!patient) {
			return res.status(404).json({message: "Patient not found"});
		}
		return res.status(200).json({message: "Patient found", patient});
	}
	catch (error) {
		console.error(`Error in getting patient: ${error.message}`);
		return res.status(500).json({message: "Could not get the patient"});
	}
}

export default getPatientByUsername;