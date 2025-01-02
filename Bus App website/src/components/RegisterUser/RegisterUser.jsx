import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import TextField from '../Common/Textfield';
import { Span } from '../Common/Typography';
import { Label } from '../Common/Typography';
import Button from '../Common/Button';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullname, setFullname] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const registerResponse = await axios.post('http://localhost:8000/api/Account/register/', {
                username,
                email,
                password,
                is_driver: false,
            });

            const loginResponse = await axios.post('http://localhost:8000/api/Account/token/', {
                username,
                password,
            });

            const { access } = loginResponse.data;

            await axios.post(
                'http://localhost:8000/api/Account/user/profile/',
                {
                    user: registerResponse.data.id,
                    phone_number: phoneNumber,
                    fullname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                }
            );

            alert("Passenger registered successfully");
        } catch (error) {
            console.error("There was an error registering!", error);
            alert("Error registering passenger: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div
            className="h-full flex items-center justify-center bg-cover bg-center bg-[url('/src/assets/test3.jpg')]
            dark:bg-[url('/src/assets/test2.jpg')]"
        >
            <div className="my-3 bg-white dark:bg-[#111827] p-8 rounded-lg shadow-md w-full max-w-md opacity-75 max-h-[90vh] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 dark:text-white text-black font-fancy">Register Passenger</h1>
                <form onSubmit={handleRegister}>
                    <div className="mt-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <TextField
                            type="text"
                            id="fullname"
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="username">Username</Label>
                        <TextField
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <TextField
                            type="text"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="email">Email</Label>
                        <TextField
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label htmlFor="password">Password</Label>
                        <TextField
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className=" mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </Button>
                    <div className="mt-4 text-center">
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

export default RegisterUser;
