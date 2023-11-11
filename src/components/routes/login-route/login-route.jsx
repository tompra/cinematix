import { useAuthCtx } from '../../../context/auth-context';
import { LoginView } from '../../views/login-view/login-view';
import { Navigate } from 'react-router';

export const LoginRoute = () => {
    const { user, setUser, token, setToken } = useAuthCtx();
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
