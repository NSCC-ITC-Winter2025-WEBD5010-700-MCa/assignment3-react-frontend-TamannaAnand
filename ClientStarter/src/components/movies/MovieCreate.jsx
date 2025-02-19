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
                <input {...register('director')} type="text" placeholder="Director" /><br />
                <input {...register('release_year')} type="text" placeholder="Year" /><br />
                <input {...register('genre')} type="text" placeholder="Genre" /><br />
                <button type="submit"> Add Movie </button>
            </form>
        </div>
    )
}

export default MovieCreate