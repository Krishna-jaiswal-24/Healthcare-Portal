import React from 'react';
import {Link} from "react-router-dom";

const Patient = () => {
	return (
		<div className="text-5xl">
			<div className={"flex flex-col items-center justify-center w-screen h-screen"}>
				Welcome to Arogya , your one stop solution for all your health needs.
				<Link to="/patient/register" className="bg-blue-500 px-4 py-2 rounded-md my-4" >Register</Link>
				<Link to="" className={"bg-blue-500 px-4 py-2 rounded-md"}>Login</Link>
			</div>
		</div>
	);
};

export default Patient;