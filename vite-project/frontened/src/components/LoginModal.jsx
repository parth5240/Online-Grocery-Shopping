import React, { useState } from 'react';
import './LoginForm.css';

const LoginModal = ({ closeModal, handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous errors

        const requestBody = { username, password };

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                handleLogin(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');  // Display the error message from the server
            }
        } catch (error) {
            setError('Network error. Please try again later.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <form onSubmit={handleLoginSubmit}>
                    {error && <p className="error-message">{error}</p>}  {/* Display error message */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
