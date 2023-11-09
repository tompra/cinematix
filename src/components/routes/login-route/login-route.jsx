import { LoginView } from '../../views/login-view/login-view';
import { Navigate } from 'react-router';

export const LoginRoute = ({ user, setUser, setToken, token }) => {
    return user ? (
        <Navigate to='/' />
    ) : (
        <div>
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        </div>
    );
};
