import Doctor from "../../models/doctor.js";
import bcrypt from "bcrypt";

const doctorRegistration = async (req, res) => {
	const {
		firstName,
		lastName,
		username,
		password,
		email,
		phone,
		aadharNumber,
		qualification,
		license,
		address
	} = req.body;

	if (!firstName || !lastName || !username || !password || !email || !phone || !aadharNumber || !qualification || !license || !address) {
		return res.status(400).json({message: "Please fill all the fields"});
	}

	const doctorExists = await Doctor.findOne({$or: [{username: username}, {aadharNumber: aadharNumber}]});
	if (doctorExists) {
		return res.status(409).json({message: "Doctor already exists with the given username or Aadhar number"});
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const doctor = await Doctor.create({
		firstName,
		lastName,
		username: username.toLowerCase(),
		password: hashPassword,
		email,
		phone,
		aadharNumber,
		qualification,
		license,
		address,
		hospital: req.hospital?._id
	});

	const createdDoctor = await Doctor.findById(doctor._id).select("-password -__v");

	if (!createdDoctor) {
		return res.status(500).json({message: "Could not register the doctor"});
	}

	return res.status(201).json({message: "Doctor registered successfully", doctor: createdDoctor});
}




export {
	doctorRegistration
}


