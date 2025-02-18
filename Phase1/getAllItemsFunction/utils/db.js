// Import the MongoDB driver
import { MongoClient } from "mongodb";

// Define our connection string
const MONGODB_URI ="mongodb+srv://anandtamanna9:wgLz8akLFmxyqpBw@cluster0.xuga9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to the database, wand store that connection and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

//check if the connection is store, if true reuse cached connection 
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = client.db("Movies");

  cachedDb = db;
  return db;
}

export default connectToDatabase;