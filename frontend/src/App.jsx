import {Link} from "react-router-dom";

function App() {

	return (
		<>
			<div className="flex items-center justify-center w-screen h-screen flex-col">
				Welcome to Arogya , your one stop solution for all your health needs.
				<Link to="/patient" className="bg-blue-500 px-4 py-2 rounded-md my-4">For Patients</Link>
				<Link to="/doctor" className="bg-blue-500 px-4 py-2 rounded-md">For Doctors</Link>
			</div>
		</>
	)
}

export default App
