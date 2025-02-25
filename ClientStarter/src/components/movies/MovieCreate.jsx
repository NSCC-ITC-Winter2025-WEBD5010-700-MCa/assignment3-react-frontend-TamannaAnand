import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function MovieCreate() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const collectData = (data) => {
        console.log(errors)
        createMovieMutation.mutate(data)
    }

    const createMovieMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.json()

        },
        onSuccess: () => {
            queryClient.invalidateQueries(['moviesData'])
            navigate('/admin/movies')
        }
    })
    // TODO
    // Need to add the errors p tag to other inputs 
    // add the following class to p tags className="text-red-500 text-sm mt-1"
    const currentYear = new Date().getFullYear()

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Movie</h2>
            <form onSubmit={handleSubmit(collectData)} className="space-y-4">
                <div>
                    <input {...register('title', { required: 'Title is required!' })} type="text" placeholder="Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.title?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Title is required</p>
                    )}
                </div>
                <div>
                    <input {...register('genre', { required: 'genre is required!' })} type="text" placeholder="Genre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.genre?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Genre is required</p>
                    )}

                </div>
                <div>
                    <input {...register('director', { required: 'director is required!' })} type="text" placeholder="Director" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.director?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Director is required</p>
                    )}
                </div>
                <div>
                    {/* need to fix this check */}
                    <input {...register('release_year', {
                        required: 'release_year is required!', max: {
                            value: currentYear,
                            message: `Year cannot be later than ${currentYear}`
                        }
                    })} type="number" placeholder="Release Year" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.release_year?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Release Year is required</p>
                    )}
                </div>
                <div>
                    <input {...register('plot', { required: 'plot is required!' })} type="text" placeholder="Plot" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.plot?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Plot is required</p>
                    )}
                </div>
                <div>
                    <input {...register('rating', { required: 'rating is required!' })} type="number" placeholder="Rating" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.rating?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Rating is required</p>
                    )}
                </div>
                <div>
                    <input {...register('language', { required: 'language is required!' })} type="text" placeholder="Language" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.language?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Language is required</p>
                    )}
                </div>
                <div>
                    <input {...register('runtime', { required: 'runtime is required!' })} type="text" placeholder="Runtime" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.runtime?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Runtime is required</p>
                    )}
                </div>
                <div>
                    <input {...register('production_company', { required: 'production_company is required!' })} type="text" placeholder="Production Company" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.production_company?.type === "required" && (
                        <p className="text-red-500 text-sm mt-1" role="alert">Production Company is required</p>
                    )}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"> Add Movie </button>
            </form>
        </div>
    )
}

export default MovieCreate