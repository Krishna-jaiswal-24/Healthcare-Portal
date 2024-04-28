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


const getAllDoctors=async (req, res) => {
	const doctors = await Doctor.find({}).select("-password -__v");
	if (!doctors) {
		return res.status(404).json({message: "No doctors found"});
	}
	return res.status(200).json(doctors);
}

const doctorLogin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Please fill all the fields for doctor" });
	}

	try {
		const doctor = await Doctor.findOne({ username: username });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor with the above credentials not found" });
		}

		console.log(doctor);
		const isPasswordCorrect = await bcrypt.compare(password, doctor.password);

		if (isPasswordCorrect) {
			return res.status(200).json({ message: "Doctor logged in successfully", doctor });
		} else {
			return res.status(401).json({ message: "Invalid password" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred during the login process" });
	}
}


export {doctorRegistration, getAllDoctors,doctorLogin};


