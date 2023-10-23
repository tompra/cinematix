import React from 'react';
import { useState } from 'react';
export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };
        fetch('https://popcornhub-api.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(response => {
                console.log('Login response:', response);
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token', response.token);
                    onLoggedIn(response.user, response.token);
                } else {
                    alert('There is no user');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Something went wrong!');
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        minLength={5}
                    />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
