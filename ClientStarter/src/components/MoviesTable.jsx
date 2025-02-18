import { useMutation } from "@tanstack/react-query"
import { useNavigate} from "react-router-dom"

const MoviesTable = ({ movies }) => {

    const navigate = useNavigate()
  
        const deleteMovieMutation = useMutation({

            mutationFn: async (movieId) => {
                const response = await fetch(`https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/delete?id=${movieId}`, {
                    method: 'DELETE'
                })
                return response.json()
            },
            onSuccess: () => {
                navigate('/admin/movies')
            }
        })
        //send delete request to API to delete selected record 

        const handleDelete = (movieId) => {
            deleteMovieMutation.mutate(movieId)
            console.log(movieId)
        }
    

    return (
        <>
            <p>Manage books here.</p>
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Director</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Release Year</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies?.map(movie => {
                        return (
                            <>
                                <tr key={movie._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{movie._id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{movie.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{movie.director}</td>
                                    <td className="border border-gray-300 px-4 py-2">{movie.release_year}</td>
                                    <td className="border border-gray-300 px-4 py-2"> {movie.genre?.join(', ') || 'N/A'}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                        <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                                        <button className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                        <button onClick={() => { handleDelete(movie._id) }} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            </>
                        )

                    })}
                </tbody>
            </table>

        </>
    )

}

export default MoviesTable;