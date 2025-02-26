import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const response = await fetch(`https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/getOne?id=${id}`);
            return response.json();
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div  className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{data.title}</h2>
            <p className="text-gray-700">Genre: {Array.isArray(data.genre) ? data.genre.join(', ') : data.genre || 'N/A'}</p>
            <p className="text-gray-700">Director: {data.director}</p>
            <p className="text-gray-700">Release Year: {data.release_year}</p>
            <p className="text-gray-700">Description: {data.plot}</p>
            <p className="text-gray-700">Rating: {data.rating}</p>
            <p className="text-gray-700">Language: {data.language}</p>
            <p className="text-gray-700">Runtime: {data.runtime}</p>
            <p className="text-gray-700">Production Company: {data.production_company || 'N/A'}</p>
            <p className="text-gray-700">Awards: {Array.isArray(data.awards) ? data.awards.map(award => `${award.award} (${award.year})`).join(', ') : 'N/A'}</p>
            <button  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all" onClick={() => navigate('/admin/movies')}>Back</button>
        </div>
    );
};

export default MovieDetails;