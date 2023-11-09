import React from 'react';
import { SignIn } from '../../views/sign-in-view/sign-in-view';
import { Navigate } from 'react-router';

export const SignInRoute = ({ user }) => {
    return !user ? <SignIn user={user} /> : <Navigate to='/' />;
};
