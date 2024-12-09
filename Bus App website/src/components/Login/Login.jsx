import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { login } from '../../redux/authSlice'; // Import Redux action

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/Account/token/', {
                username,
                password,
            });
            const { access, refresh } = response.data;

            // Decode the token to get the is_driver field
            const decodedToken = jwtDecode(access);
            const is_driver = decodedToken.is_driver;

            // Store tokens in localStorage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('is_driver', is_driver.toString());

            // Update Redux state
            dispatch(login({ userRole: is_driver ? 'driver' : 'passenger' }));

            // Redirect based on role
            navigate(is_driver ? '/driver/form' : '/user/form');
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/src/assets/Subs-Image.jpg')" }}
        >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-700">
                                Remember Me
                            </label>
                        </div>
                        <span className="text-blue-500 hover:underline cursor-pointer">
                            Forgot Password?
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <span>
                            New Here?{" "}
                            <Link to="/RegisterDriver" className="text-blue-500 hover:underline">
                                Create Driver Account
                            </Link>
                        </span>
                    </div>
                    <div className="mt-4 text-center">
                        <Link to="/RegisterUser" className="text-blue-500 hover:underline">
                            Create Passenger Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
