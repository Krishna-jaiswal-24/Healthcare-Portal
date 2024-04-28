import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

import AppointmentsList from "../../components/appointmentList.jsx";

const PatientDashboard = () => {
	const location = useLocation();

	const [patient, setPatient] = useState(location.state.patient.patient);
	const [appointments, setAppointments] = useState([]);
	const [isFetching, setIsFetching] = useState(true);

	console.log('Patient:', patient);
	useEffect(() => {
		const fetchAppointments = async () => {
			if (patient._id) {
				try {
					const response = await axios.get(`http://localhost:8000/api/patient/getPatientAppointments/${patient._id}`);
					setAppointments(response.data.appointments);
					setIsFetching(false); // Update fetching state
				} catch (error) {
					console.error('Error fetching appointments:', error);
					setIsFetching(false); // Update fetching state even on error
				}
			}
		};

		if (patient._id) {
			fetchAppointments();
		} else {
			setIsFetching(false);
		}
	}, [patient._id]);
	console.log(appointments)
	return (
		<>
			<h1 className="p-10 text-2xl">
				Welcome {patient.firstName} {patient.lastName} to your dashboard.
			</h1>
			{isFetching ? (
				<p>Loading appointments...</p>
			) : appointments.length > 0 ? (
				<ul>
						{appointments.map(appointment => (
							<li key={appointment._id}><AppointmentsList appointments={appointments} /></li>
						))}
				</ul>
			) : (
				<p>No appointments found.</p>
			)}
		</>
	);
};

export default PatientDashboard;
