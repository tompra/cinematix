import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @function AuthenticatedRoute
 * @param {object} props - props
 * @param {object} props.children - children
 * @returns {JSX.Element} - Rendered AuthenticatedRoute component
 * @description - If no user or token is found, the user is redirected to the login page.
 */

export const AuthenticatedRoute = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (!storedUser || !storedToken) {
        console.log('No user or token found, you must log in.');
        return <Navigate to='/login' replace />;
    }

    return <>{children}</>;
};
