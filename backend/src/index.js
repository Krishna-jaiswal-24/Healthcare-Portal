import dotenv from 'dotenv';
import {app} from "./app.js";
import connectDb from "./db/connectDb.js";

dotenv.config();

const port = process.env.PORT ;



const start= async () => {
	try {
		await connectDb();
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
		app.get('/', (req, res) => {
			res.send('Hello World');
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
}

start();

