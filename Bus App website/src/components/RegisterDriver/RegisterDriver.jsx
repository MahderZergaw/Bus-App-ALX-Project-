import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import TextField from '../Common/Textfield';
import { Label } from '../Common/Typography';
import { Span } from '../Common/Typography';
import Button from '../Common/Button';

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
            <div className="my-3 bg-white dark:bg-[#111827] p-8 rounded-lg shadow-md w-full max-w-md opacity-75">
                <h1 className="text-2xl font-bold mb-4 font-fancy ">Register Driver</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <Label htmlFor="fullname" className="block ">
                            Full Name
                        </Label>
                        <TextField
                            type="text"
                            id="fullname"
                            className="w-full px-3 py-1 "
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="username" className="block ">
                            Username
                        </Label>
                        <TextField
                            type="text"
                            id="username"
                            className="w-full px-3 py-1 "
                            placeholder="Enter Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="plateNumber" className="block ">
                            Plate Number
                        </Label>
                        <TextField
                            type="text"
                            id="plateNumber"
                            className="w-full px-3 py-1"
                            placeholder="Enter Plate Number"
                            value={plateNumber}
                            onChange={e => setPlateNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="block ">
                            Email
                        </Label>
                        <TextField
                            type="email"
                            id="email"
                            className="w-full px-3 py-1 "
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" className="block ">
                            Password
                        </Label>
                        <TextField
                            type="password"
                            id="password"
                            className="w-full px-3 py-1 "
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </Button>
                    <div className="mt-4 text-center ">
                        <Span>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </Span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterDriver;
