import connectToDatabase from "./utils/db.js";
import { ObjectId } from "mongodb";
import { patchAnime } from "../ValidationModel/model.js";

export const handler = async (event) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Anime");

        // Get the id for the doc from the query parameters
        const id = event.queryStringParameters && event.queryStringParameters.id;

        // Check if the id is provided and is a valid ObjectId
        if (!id || !ObjectId.isValid(id)) {
            console.log("Invalid or missing ID");
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid or missing ID in query parameters" }),
            };
        }

        // Parse the incoming data from the payload body
        const { field, update } = JSON.parse(event.body);

        // Check if the field is a valid field in the schema
        const validFields = Object.keys(patchAnime.schema.paths); // Get all the paths from the schema
        if (!validFields.includes(field)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: `Invalid field: ${field}. Field does not exist in the schema.` }),
            };
        }

        // Construct the update data
        const updateData = {};  
        updateData[field] = update;

        // Validate the updateData using the patchAnime model schema
        try {
            await patchAnime.validate(updateData); // Validate the entire updateData
        } catch (validationError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Validation failed", error: validationError.message }),
            };
        }

        // Update the document in the database
        const result = await collection.updateOne(
            { _id: new ObjectId(`${id}`) },
            { $set: updateData }
        );

        return {
            statusCode: 200, // OK status code
            body: JSON.stringify({
                message: "Movie Updated Successfully",
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to Update Movie", error: error.message }),
        };
    }
};
