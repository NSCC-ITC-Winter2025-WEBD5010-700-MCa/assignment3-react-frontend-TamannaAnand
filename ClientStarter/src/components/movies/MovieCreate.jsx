import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function MovieCreate() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const createBookMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/create`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            return response.json()
            
        },
       onSuccess: () => {
        queryClient.invalidateQueries(['moviesData'])
        navigate('/admin/movies')
       }
    })

    return (
        <div>
            <h2>Create New Book</h2>
            <form onSubmit={handleSubmit(createBookMutation.mutate)}>
                <input {...register('title')} type="text" placeholder="Title" /><br />
                <input {...register('genre')} type="text" placeholder="Genre" /><br />
                <input {...register('director')} type="text" placeholder="Director" /><br />
                <input {...register('release_year')} type="text" placeholder="Release Year" /><br />
                <input {...register('plot')} type="text" placeholder="Plot" /><br />
                <input {...register('rating')} type="text" placeholder="Rating" /><br />
                <input {...register('language')} type="text" placeholder="Language" /><br />
                <input {...register('runtime')} type="text" placeholder="Runtime" /><br />
                <input {...register('production_company')} type="text" placeholder="Production Company" /><br />
                <button type="submit"> Add Movie </button>
            </form>
        </div>
    )
}

export default MovieCreate