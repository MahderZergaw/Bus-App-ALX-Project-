import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const RegisterDriver = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [fullname, setFullname] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();  // Prevent the default form submission
        try {
            // Register the user
            console.log("clicked");
            const registerResponse = await axios.post('http://localhost:8000/api/Account/register/', {
                username,
                email,
                password,
                is_driver: true
            });

            console.log(registerResponse);

            // Log in to obtain the token
            const loginResponse = await axios.post('http://localhost:8000/api/Account/token/', {
                username,
                password
            });

            const { access } = loginResponse.data;

            // Make the authenticated request to create the driver profile
            await axios.post('http://localhost:8000/api/Account/driver/profile/', {
                user: registerResponse.data.id,
                plate_number: plateNumber,
                fullname: fullname,
            }, {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });

            alert("Driver registered successfully");
        } catch (error) {
            console.error("There was an error registering!", error);
            alert("Error registering driver: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/src/assets/test1.jpg')]
            dark:bg-[url('/src/assets/darkmodeBg.jpg')]"
            
        >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Account for Driver</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="Enter Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="plateNumber" className="block text-gray-700">
                            Plate Number
                        </label>
                        <input
                            type="text"
                            id="plateNumber"
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="Enter Plate Number"
                            value={plateNumber}
                            onChange={e => setPlateNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded text-gray-900"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                    <div className="mt-4 text-center text-gray-700">
                        <span>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterDriver;
