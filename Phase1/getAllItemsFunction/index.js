//READ 
import connectToDatabase from "./utils/db.js";


//Get all items 
export const handler = async (event) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Anime");

        // Fetch all documents from the collection
        const movies = await collection.find({}).toArray();

        return {
            statusCode: 200, //OK status code
            body: JSON.stringify(movies), //return all movies in an array
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to Fetch Movies", error: error.message }), // return custom message and error message
        };
    }
};

