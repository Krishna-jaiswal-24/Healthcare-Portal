import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import PatientRegister from './pages/patient/patient.register.jsx';
import Patient from './pages/patient/patient.jsx';
import PatientDashboard from './pages/patient/patient.dashboard.jsx';

import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
	},
	{
		path: "/patient",
		element: <Patient/>,
	},
	{
		path: "/patient/register",
		element: <PatientRegister/>,
	},{
		path: "/patient/dashboard",
		element: <PatientDashboard/>,

	}
]);

// Ensure the root div exists in the index.html file with id="root"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
		<RouterProvider router={router}/>
);
