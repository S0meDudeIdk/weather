// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const { username, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });
            setMessage('Registered successfully');
        } catch (err) {
            console.error(err.response.data);
            setMessage('Failed to register, User already exists');
        }
    };

    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;