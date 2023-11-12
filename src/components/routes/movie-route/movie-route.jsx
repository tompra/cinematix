import { SpinnerComp } from '../../shared/spinner/spinner';
import { MovieView } from '../../views/movie-view/movie-view';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { AuthenticatedRoute } from '../authenticated-route/authenticated-route';
import { useAuthCtx } from '../../../context/auth-context';

export function MovieRoute() {
    const { loading } = useAuthCtx();
    return (
        <AuthenticatedRoute>
            {loading ? (
                <>
                    <NavBar />
                    <SpinnerComp />
                </>
            ) : (
                <>
                    <NavBar />
                    <MovieView />
                </>
            )}
        </AuthenticatedRoute>
    );
}
