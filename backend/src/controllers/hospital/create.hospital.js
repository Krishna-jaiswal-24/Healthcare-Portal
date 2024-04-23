import Hospital from "../../models/hospital.js";
const createHospital = async (req, res) => {
	const {hospitalName, hospitalAddress, hospitalPhone, workingDays, emergencyServices, NIN2HFI} = req.body;

	if (!hospitalName || !hospitalAddress || !hospitalPhone || !workingDays || !emergencyServices || !NIN2HFI) {
		return res.status(400).json({message: "Please fill all the fields"});
	}

	const hospitalExists = await Hospital.findOne({NIN2HFI});

	if (hospitalExists) {
		return res.status(409).json({message: "Hospital already exists with the given NIN2HFI"});
	}

	const hospital = await Hospital.create({
		hospitalName,
		hospitalAddress,
		hospitalPhone,
		workingDays,
		emergencyServices,
		NIN2HFI
	});


	if (!hospital) {
		return res.status(500).json({message: "Could not register the hospital"});
	}

	return res.status(201).json({message: "Hospital registered successfully", hospital: hospital});

}

const getAllHospital = async (req, res) => {
	const hospitals=await Hospital.find({});
	if(!hospitals){
		return res.status(404).json({message: "No hospitals found"});
	}
	return res.status(200).json({hospitals});
}

export {createHospital, getAllHospital};