import { LoginView } from '../../views/login-view/login-view';
import { Navigate } from 'react-router';

export const LoginRoute = ({ user, token, setUser, setToken }) => {
    return !user ? (
        <LoginView
            onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }}
        />
    ) : (
        <Navigate to='/' />
    );
};
