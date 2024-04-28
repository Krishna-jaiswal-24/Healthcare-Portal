import Patient from "../../models/patients.js";
import bcrypt from "bcrypt";
import Patients from "../../models/patients.js";


const generateAccessAndRefereshTokens = async (patientId) => {
	try {
		const patient = await Patient.findById(patientId);
		const accessToken = patient.generateAccessToken();
		const refreshToken = patient.generateRefreshToken();

		patient.refreshToken = refreshToken;
		await patient.save({validateBeforeSave: false});

		return {accessToken, refreshToken};
	} catch (error) {
		console.error(`Error in generating tokens: ${error.message}`);
		return {accessToken: null, refreshToken: null};
	}
};

const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			username,
			password,
			email,
			phone,
			age,
			aadharNumber,
			gender,
			address,
			dob
		} = req.body;

		//Check if all fields are present
		if (!firstName || !lastName || !username || !password || !email || !phone || !age || !aadharNumber || !gender || !address || !dob) {
			return res.status(400).json({message: "Please fill all the fields"});
		}

		//Check if the patient already exists
		const patientExists = await Patient.findOne({
			$or: [
				{username: username},
				{aadharNumber: aadharNumber}
			]
		});
		if (patientExists) {
			return res.status(409).json({message: "Patient already exists with the given username or Aadhar number"});
		}

		const hashPassword = await bcrypt.hash(password, 10);
		console.log(hashPassword);
		//Create a new patient
		const patient = await Patient.create({
			firstName,
			lastName,
			username: username.toLowerCase(),
			password: hashPassword,
			email,
			phone,
			age,
			aadharNumber,
			gender,
			address,
			dob
		});

		const createdPatient = await Patient.findById(patient._id).select(
			"-password -__v");


		if (!createdPatient) {
			return res.status(500).json({message: "Could not register the patient"});
		}

		console.log(createdPatient);
		return res.status(201).json({message: "Patient registered successfully", patient: createdPatient});
		//
		// // Log URL and status code before sending the response
		// console.log(`Request URL: /patient${req.url}, Status Code: ${res.statusCode}`);

	} catch (error) {
		console.error(`Error in patient registration: ${error.message}`);
		res.status(500).json({message: "Could Not register the patient"});
	}
}


const login = async (req, res) => {
	const {username, password, aadharNumber} = req.body;
	if (!(username || aadharNumber)) {
		return res.status(400).json({message: "Please fill all the fields"});
	}
	const patient = await Patient.findOne({$or: [{username: username}, {aadharNumber: aadharNumber}]});

	if (!patient) {
		return res.status(404).json({message: "Patient not found"});
	}

	const isPasswordCorrect = await patient.isPasswordCorrect(password);

	if (!isPasswordCorrect) {
		return res.status(401).json({message: "Invalid credentials"});
	}

	const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(
		patient._id
	);

	const loggedInPatient = await Patient.findById(patient._id).select("-password -__v");
	console.log("login successful",loggedInPatient);


	return res.status(200).json({
		message: "Patient logged in successfully",
		patient: loggedInPatient,
		accessToken,
		refreshToken
	});
};

const getAllPatients = async (req, res) => {
	try {
		const patients = await Patient.find();
		if (!patients) {
			return res.status(404).json({message: "No patients found"});
		}
		return res.status(200).json({message: "Patients found", patients});
	} catch (error) {
		console.error(`Error in getting all patients: ${error.message}`);
		return res.status(500).json({message: "Could not get all patients"});
	}

}

const getPatient = async (req, res) => {
	try {
		const patientId = req.params.patientId;
		console.log(patientId);
		const patient=await Patient.findById({_id:patientId});

		if(!patient){
			return res.status(404).json({message: "Patient not found"});
		}
		return res.status(200).json({message: "Patient found", patient});
		}
	catch (error) {
		console.error(`Error in getting patient: ${error.message}`);
		return res.status(500).json({message: "Could not get the patient"});
	}
}
export {register, login, getAllPatients,getPatient};