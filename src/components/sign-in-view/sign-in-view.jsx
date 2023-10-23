import { useState } from 'react';

useState;
export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };

        fetch('https://popcornhub-api.onrender.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('DATA', data);
            if (response.ok) {
                alert('Signup sucessful');
                window.location.reload();
            } else {
                alert('Signup failed');
            }
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
                        minLength={5}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minLength={8}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Birthday
                    <input
                        type='date'
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
