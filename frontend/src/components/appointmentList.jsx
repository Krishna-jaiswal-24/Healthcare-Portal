import React from 'react';
import AppointmentCard from './appointmentCard';

const AppointmentsList = ({ appointments }) => {
	return (
		<div className="space-y-4">
			{appointments.map((appointment) => (
				<AppointmentCard key={appointment._id} appointment={appointment} />
			))}
		</div>
	);
};

export default AppointmentsList;
