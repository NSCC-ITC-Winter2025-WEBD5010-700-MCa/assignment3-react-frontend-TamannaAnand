//READ 
import connectToDatabase from "./utils/db.js";
import { ObjectId } from "mongodb";

//get item by ID
export const handler = async (event) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Anime");

         // get the id for the doc from the query parameters
         const id  = event.queryStringParameters && event.queryStringParameters.id;

         if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "ID is required in the query parameters" }),
            };
        }

        // get the document with the specified ID
        const movie = await collection.findOne({ _id: new ObjectId(`${id}`) });

        if (!movie) {
            return {
                statusCode: 404, // Not Found status code
                body: JSON.stringify({ message: "Movie not found" }),
            };
        }

        return {
            statusCode: 200, // OK status code
            body: JSON.stringify(movie), // Return the movie as a response
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to Fetch Movie", error: error.message }),
        };
    }
};