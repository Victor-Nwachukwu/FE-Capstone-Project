import React from 'react'
import { useNavigate } from 'react-router-dom';



function Login({ username, setUsername, password, setPassword, statusMessage, handleLogin })  {
    const navigate = useNavigate();
    

    return (

    // Main container with full screen height, dark background, and centered content
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

        {/* Login form container (a card-like element) */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm">
            {/* Title and description */}
            <h2 className="text-4xl font-extrabold text-purple-700 md:text-5xl text-center mb-2">
            Knowledge Quest
            </h2>
            <p className="text-center text-lg md:text-xl text-gray-400 font-medium mb-8">
            Where every answer is an adventure
            </p>

            {/* The login form */}
            <form onSubmit={handleLogin}>
            {/* Username input field group */}
            <div className="mb-6">
                <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
                >
                Username
                </label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter your username"
                required
                />
            </div>

            {/* Password input field group */}
            <div className="mb-6">
                <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
                >
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter your password"
                required
                />
            </div>

            {/* Login button */}
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
                Log In
            </button>
            </form>

            {/* Display a status message if one exists */}
            {statusMessage && (
            <p
                className={`mt-4 text-center text-sm font-semibold ${
                statusMessage.includes('successful')
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
            >
                {statusMessage}
            </p>
            )}
        </div>
    </div>
    );         
}


export default Login;