import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import bgImage from '../assets/bg1.jpg';
import {
    UserIcon,
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';



export function Login(){
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Login
                const response = await axios.post('https://dummyjson.com/auth/login', {
                    username: formData.email,
                    password: formData.password,
                    expiresInMins: 30
                });

                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                // Signup
                console.log('Signup data:', formData);
                // For demo purposes, log in after "signup"
                const response = await axios.post('https://dummyjson.com/auth/login', {
                    username: "emilys",
                    password: "emilyspass",
                    expiresInMins: 30
                });

                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (

        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Header Navigation */}
                <header className="flex items-center justify-between px-6 py-4 bg-white">
                    <div className="text-lg font-bold text-gray-800">Anywhere app.</div>
                    <nav className="space-x-6 text-sm text-gray-600 hidden sm:block">
                        <a href="#" className="hover:text-blue-500">Home</a>
                        <a href="#" className="hover:text-blue-500">Join</a>
                    </nav>
                </header>

                <main className="flex-grow flex items-center justify-center px-6">
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <p className="text-sm text-gray-400 font-medium">START FOR FREE</p>
                            <h2 className="text-4xl font-bold text-gray-900 mt-2">
                                {isLogin? "Login Here" : "Create new account"}
                                <span className="text-blue-500">.</span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                {!isLogin? "Already A Member? ": "If you not have an account, "}
                                <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
                                    {isLogin? "Create New Account" : "Log In"}
                                </button>
                            </p>
                        </div>

                        {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                        />
                                        <UserIcon className="w-4 h-4 absolute right-3 top-3 text-gray-500"/>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                        />
                                        <UserIcon className="w-4 h-4 absolute right-3 top-3 text-gray-500"/>
                                    </div>
                                </div>
                            )}

                            <div className="relative">
                                <input
                                    type={isLogin ? "text" : "email"}
                                    name="email"
                                    placeholder={isLogin ? "Username" : "Email"}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                />
                                <EnvelopeIcon className="w-4 h-4 absolute right-3 top-3 text-gray-500"/>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-3 border-2 border-blue-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                />
                                {/*<LockClosedIcon className="w-4 h-4 absolute right-3 top-3 text-gray-500"/>*/}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeIcon className="w-5 h-5"/>
                                    ) : (
                                        <EyeSlashIcon className="w-5 h-5"/>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    className="w-1/2 bg-gray-100 text-gray-600 py-3 rounded-md hover:bg-gray-200 transition"
                                >
                                    Change method
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-blue-500 text-white font-medium py-3 rounded-md hover:bg-blue-600 transition"
                                >
                                    {isLogin ? "Log In" : "Create account"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Right Image Section */}
            <div className="hidden lg:block w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        borderTopLeftRadius: "80% 100px",
                        borderBottomLeftRadius: "80% 100px",
                    }}
                />
                <div className="absolute bottom-6 right-6">
                    <img src=" " alt="Logo" className="w-10"/>
                </div>
            </div>
        </div>

    )
}