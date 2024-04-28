import React, { createContext, useState, useContext } from 'react';

// Create a context
const PatientContext = createContext(undefined);

// Custom hook for using this context
export const usePatient = () => useContext(PatientContext);

// Provider component
export const PatientProvider = ({ children }) => {
	const [patient, setPatient] = useState(null);

	const updatePatient = (data) => {
		setPatient(data);
	};

	return (
		<PatientContext.Provider value={{ patient, updatePatient }}>
			{children}  // Ensure children are included here
		</PatientContext.Provider>
	);
};
