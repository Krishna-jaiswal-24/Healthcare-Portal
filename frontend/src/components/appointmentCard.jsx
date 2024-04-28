import React from 'react';

const AppointmentCard = ({ appointment }) => {
	// Formatting the date
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div className="md:flex">
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Appointment</div>
					<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
						{appointment.type} with Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
					</a>
					<p className="mt-2 text-gray-500">
						Date: {formatDate(appointment.date)}
					</p>
					<p className="mt-2 text-gray-500">
						Status: {appointment.status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AppointmentCard;
