//DELETE
import connectToDatabase from "./utils/db.js";
// Import the MongoDB driver
import { ObjectId } from "mongodb";

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

        //Delete the document with the specified ID
        const result = await collection.deleteOne({_id: new ObjectId(`${id}`)});

        return {
            statusCode: 200, //OK status code
            body: JSON.stringify({ //return custom message and delete count
                message: "Movie Deleted Successfully",
                deletedCount: result.deletedCount,
              }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to Delete Movie", error: error.message }), // return custom message and error message
        };
    }
};