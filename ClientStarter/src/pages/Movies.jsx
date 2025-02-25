import { useQuery } from '@tanstack/react-query'
import MoviesTable from '../components/movies/MoviesTable';
import { Outlet, useLocation } from 'react-router-dom'


const Movies = () => {

    const location = useLocation()//get location info 

    const { isPending, error, data: movies } = useQuery({
        queryKey: ['moviesData'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}get`)
            return response.json()
        },
        staleTime: Infinity
    })

    if (error) return <div>{`An error has occurred: + ${error.message}`}</div>



    return (
        <div>

            <h1 className="text-2xl font-bold">Movies</h1>

            {
                location.pathname === '/admin/movies' ? (
                    isPending ? <div>Loading....</div> : <MoviesTable movies={movies} />
                ) 
                : 
                <Outlet />
            }

        </div>
    )
};
export default Movies;
