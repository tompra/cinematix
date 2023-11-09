import { Navigate } from 'react-router-dom';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { ProfileView } from '../../views/profile-view/profile-view';

export function ProfileRoute({
    user,
    setUser,
    setToken,
    movies,
    token,
    movieData,
}) {
    if (!user) {
        <Navigate to='/login' replace />;
    }
    return (
        <>
            <NavBar setUser={setUser} setToken={setToken} user={user} />
            <ProfileView
                setUser={setUser}
                user={user}
                token={token}
                movieData={movies}
            />
        </>
    );
}
