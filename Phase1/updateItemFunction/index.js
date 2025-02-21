import connectToDatabase from "./utils/db.js";
import { ObjectId } from "mongodb";
import { patchAnime } from "../ValidationModel/model.js";

export const handler = async (event) => {

    // Handle OPTIONS request for CORS preflight
    if (event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",  // Make sure PATCH is included here
                "Access-Control-Allow-Headers": "Content-Type",  // Allow headers for content-type
            },
            body: JSON.stringify({ message: "CORS preflight successful" }),
        };
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Anime");

        // Get the id for the doc from the query parameters
        const id = event.queryStringParameters?.id;

        if (!id || !ObjectId.isValid(id)) {
            console.log("Invalid or missing ID");
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Invalid or missing ID in query parameters" }),
            };
        }

        const updateData = JSON.parse(event.body);

        if (!updateData || typeof updateData !== "object") {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Invalid update data. Expected an object." }),
            };
        }

        // Validate updateData against schema
        const validFields = Object.keys(patchAnime.schema.paths);
        const filteredUpdateData = {};

        for (const [key, value] of Object.entries(updateData)) {
            if (validFields.includes(key)) {
                filteredUpdateData[key] = value;
            }
        }

        if (Object.keys(filteredUpdateData).length === 0) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "No valid fields provided for update." }),
            };
        }

        await patchAnime.validate(filteredUpdateData);

        // Update the document
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: filteredUpdateData }
        );

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // Same origin for CORS
                "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",  // Allowing Content-Type header
            },
            body: JSON.stringify({
                message: "Movie Updated Successfully",
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
            }),
        };

        return response;

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },  // Ensure CORS headers are present on error as well
            body: JSON.stringify({ message: "Failed to Update Movie", error: error.message }),
        };
    }
};
