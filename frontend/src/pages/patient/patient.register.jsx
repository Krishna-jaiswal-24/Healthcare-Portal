import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PatientRegister = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		email: '',
		phone: '',
		age: 0,
		aadharNumber: '',
		gender: '',
		address: '',
		dob: "",
	});
	const navigate= useNavigate();
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');  // State to store error message

	const handleChange = (e) => {
		let {name, value} = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');  // Clear previous errors
		try {
			const response = await axios.post('http://localhost:8000/api/patient/register', formData);
			console.log('Response:', response.data);
			setSubmitSuccess(true);  // Update state to indicate successful submission
			navigate('/patient/dashboard', { state: { patient: response.data } });

		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitSuccess(false);  // Update state to indicate failed submission
			// Set error message from response or default message
			setErrorMessage(error.response?.data?.message || 'Failed to register. Please try again.');
		}
	};

	return (
		<div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded">
			<h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
			{errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
			<form onSubmit={handleSubmit}>
				<label className="block mb-2">
					First Name:
					<input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Last Name:
					<input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Username:
					<input type="text" name="username" value={formData.username} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Password:
					<input type="password" name="password" value={formData.password} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Email:
					<input type="email" name="email" value={formData.email} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Phone:
					<input type="text" name="phone" value={formData.phone} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Age:
					<input type="number" name="age" value={formData.age} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Aadhar Number:
					<input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Gender:
					<select name="gender" value={formData.gender} onChange={handleChange}
					        className="mt-1 p-2 w-full border rounded">
						<option value="">Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</label>
				<label className="block mb-2">
					Address:
					<input type="text" name="address" value={formData.address} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<label className="block mb-2">
					Date of Birth:
					<input type="date" name="dob" value={formData.dob} onChange={handleChange}
					       className="mt-1 p-2 w-full border rounded"/>
				</label>
				<button type="submit"
				        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Register
				</button>
			</form>
		</div>
	);
};

export default PatientRegister;