import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Textfield from '../Common/Textfield'
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { login } from '../../redux/authSlice'; // Import Redux action
import { Label, Span  } from '../Common/Typography';
import Button from '../Common/Button';

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
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/src/assets/test1.jpg')]
            dark:bg-[url('/src/assets/darkmodeBg.jpg')]"
        >
            <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md w-full max-w-md opacity-75">
                <h1 className="text-2xl font-bold mb-4 font-fancy ">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <Label htmlFor="username" className="block">
                            Username
                        </Label>
                        <Textfield
                            type="text"
                            id="username"
                            className="w-full px-3 py-2"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" className="block ">
                            Password
                        </Label>
                        <Textfield
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 "
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                  
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <input  type="checkbox" id="remember" className="mr-2" />
                            <Label htmlFor="remember" >
                                Remember Me
                            </Label>
                        </div>
                        <Span className="text-blue-500 hover:underline cursor-pointer">
                            Forgot Password?
                        </Span>
                    </div>
                    <div className="flex justify-center">
                    <Button
                        type="submit"
                        className="w-40 rounded transition duration-200 "
                    >
                        Login
                    </Button>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <Span className="inline-flex space-x-4">
                            New Here?{" "}
                            <Link to="/RegisterDriver" className="text-blue-500 hover:underline">
                            &nbsp; &nbsp; Driver Signup  
                            </Link>
                            <Link to="/RegisterUser" className="text-blue-500 hover:underline">
                             Passenger Signup 
                        </Link>
                        </Span>
                        
                    </div>
                   
                </form>
            </div>
        </div>
    );
};

export default Login;
