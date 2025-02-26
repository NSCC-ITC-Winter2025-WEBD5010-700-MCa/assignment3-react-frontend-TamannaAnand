import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

const MovieEdit = () => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { isPending, error, data } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const response = await fetch(`https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/getOne?id=${id}`)
            return response.json()
        }
    })

    useEffect(() => {
        if(data) {
            setValue('title', data.title)
            setValue('genre', data.genre)
            setValue('director', data.director)
            setValue('release_year', data.release_year)
            setValue('plot', data.plot)
            setValue('rating', data.rating)
            setValue('language', data.language)
            setValue('runtime', data.runtime)
            setValue('production_company', data.production_company),
            setValue('awards', data.awards)
        }
    }, [data])

    const editMovieMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}update?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
                
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['moviesData'])
            navigate('/admin/movies')
        }
    })

    const collectData = (formData) => {
        editMovieMutation.mutate(formData)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Movie</h2>
        <form onSubmit={handleSubmit(collectData)} className="space-y-4">
            <div>
                <input {...register('title')} type="text" placeholder="Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('genre')} type="text" placeholder="Genre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

            </div>
            <div>
                <input {...register('director')} type="text" placeholder="Director" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('release_year')} type="number" placeholder="Release Year" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('plot')} type="text" placeholder="Plot" className="w-full  word-wrap px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('rating')} type="number" step="0.01" placeholder="Rating" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('language')} type="text" placeholder="Language" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('runtime')} type="text" placeholder="Runtime" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('production_company')} type="text" placeholder="Production Company" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <input {...register('awards')} type="text" placeholder="Awards" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"> Edit Movie </button>
        </form>
    </div>
    )
}

export default MovieEdit