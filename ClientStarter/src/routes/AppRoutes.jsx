import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Movies from '../pages/Movies';
import MovieCreate from '../components/movies/MovieCreate'
import MovieEdit from '../components/movies/MovieEdit';
import MovieDetails from '../components/movies/MovieDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'movies',
        element: <Movies />,
        children: [
          {
            path:'create',
            element: <MovieCreate />
          },
          {
            path:':id/edit',
            element: <MovieEdit />
          },
          {
            path:':id/details',
            element: <MovieDetails />
          }
        ]
      },
    ],
  },
]);

export default router;
