import React from 'react';
import { SignIn } from '../../views/sign-in-view/sign-in-view';
import { Navigate } from 'react-router';
import { useAuthCtx } from '../../../context/auth-context';

export const SignInRoute = () => {
    const { user } = useAuthCtx();
    return !user ? <SignIn user={user} /> : <Navigate to='/' />;
};
