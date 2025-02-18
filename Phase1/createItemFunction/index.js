//CREATE
import connectToDatabase from "./utils/db.js";
import { postAnime } from '../ValidationModel/model.js'

export const handler = async (event) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Anime");

        // Parse the incoming data from the payload body 
        const data = JSON.parse(event.body)

        // Validate the data using the POST schema
        const anime = new postAnime(data);
        await anime.validate();

        // Insert the new document into the collection
        const result = await collection.insertOne(data)

        return {
            statusCode: 200, //OK status code
            body: JSON.stringify({ message: "Movie Created Successfully", id: result.insertedId }), //return custom message and insert ID for doc
        };
    } catch (error) {
        console.error("Error handling request", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to Create Movie", error: error.message }), // return custom message and error message
        };
    }
};