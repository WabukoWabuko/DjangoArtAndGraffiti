import { useState } from 'react';
import API from '../../api/axiosConfig';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', full_name: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/auth/register/', form);
        alert('Registration successful!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
