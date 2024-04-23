import mongoose from "mongoose";
const DB_NAME = "healthcare";
const connectDb = async () => {
	  try {
	const conn = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
	console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
	console.error(`DB FAILED TO CONNECT: ${error.message}`);
	process.exit(1);
  }
}

export default connectDb;