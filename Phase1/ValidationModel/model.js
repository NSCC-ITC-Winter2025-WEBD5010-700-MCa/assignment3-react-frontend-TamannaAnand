//validation/model.js
import mongoose from "mongoose";

//Post endpoint schema
const postMovieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "title is required"],
        minLength: [3, 'title must be at least 3 characters long.']
    },
    genre: { 
        type: [String], 
        required: [true, "genre is Required"],
        minLength: [3, 'genre must be at least 3 characters long.'],
        min: [1, 'genre must have at least 1 value']
    },
    director: { 
        type: String, 
        required: [true, "director is Required"] 
    },
    release_year: { 
        type: Number, 
        required: [true, "release_year is Required"], 
        max: [new Date().getFullYear(), "release_year must be below current year"] 
    },
    plot: { 
        type: String, 
        required: [true, "plot is Required"] 
    },
    rating: { 
        type: Number, 
        required: [true, "rating is Required"], 
        min: [0, "rating must be at least 0"], 
        max: [10, 'rating must be below 10']
    },
    language: { 
        type: String, 
        required: [true, "language is Required"] 
    },
    runtime: { 
        type: Number, 
        required: [true, "runtime is Required"] 
    },
    production_company: { 
        type: String,
        required: [true, "production_company is Required"] 
    },
    awards: [
        {
            award: { 
                type: String, 
                required: [true, "award is Required"]
            },
            year: { 
                type: Number, 
                required: [true, "year is Required"],
                max: [new Date().getFullYear(), "release_year must be below current year"]  
            },
        },
    ],
})

//export post endpoint schema
export const postAnime = mongoose.model("PostAnime", postMovieSchema);

//patch endpoint schema 
const patchMovieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minLength: [3, 'title must be at least 3 characters long.']
    },
    genre: { 
        type: [String], 
        minLength: [3, 'genre must be at least 3 characters long.'],
        min: [1, 'genre must have at least 1 value']
    },
    director: { 
        type: String, 
    },
    release_year: { 
        type: Number, 
        max: [new Date().getFullYear(), "release_year must be below current year"] 
    },
    plot: { 
        type: String, 
    },
    rating: { 
        type: Number, 
        min: [0, "rating must be at least 0"], 
        max: [10, 'rating must be below 10']
    },
    language: { 
        type: String
    },
    runtime: { 
        type: Number
    },
    production_company: { 
        type: String 
    },
    awards: [
        {
            award: { 
                type: String
            },
            year: { 
                type: Number, 
                max: [new Date().getFullYear(), "release_year must be below current year"]  
            },
        },
    ],
})

//export patch endpoint schema
export const patchAnime = mongoose.model("PatchAnime", patchMovieSchema);
