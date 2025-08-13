"use client";

import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSubmit }) => {
    const [username, setUsername] = useState('Bob');
    const [password, setPassword] = useState('1234');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                        Login
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-700"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-700"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <a href="#" className="text-purple-700 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        )
    );
};

export default LoginModal;
