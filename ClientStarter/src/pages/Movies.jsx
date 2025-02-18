//api https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/get
import { useQuery } from '@tanstack/react-query'
import MoviesTable from '../components/MoviesTable';

const Movies = () => {
    const { isPending, error, data: movies } = useQuery({
        queryKey: ['moviesData'],
        queryFn: async () => {
            const response = await fetch('https://36sjcqdtk5.execute-api.us-east-1.amazonaws.com/get')
            return response.json()
        },
    })

    if (error) return <div>{`An error has occurred: + ${error.message}`}</div>



    return (
        <div>
            <h1 className="text-2xl font-bold">Movies</h1>
            {
                isPending ?
                    <div>Loading....</div>
                    :
                    <>
                     <MoviesTable movies={movies}/>
                    </>
            }
        </div>
    );
};
export default Movies;
