import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A responsive login form component.
 * This component is designed to adapt its layout and styling for both
 * mobile and desktop views using Tailwind CSS's responsive prefixes.
 *
 * @param {object} props - The component's props.
 * @param {string} props.username - The current username state value.
 * @param {function} props.setUsername - State setter function for the username.
 * @param {string} props.password - The current password state value.
 * @param {function} props.setPassword - State setter function for the password.
 * @param {string} props.statusMessage - The message to display after login attempts.
 * @param {function} props.handleLogin - The function to handle form submission.
 */
function Login({ username, setUsername, password, setPassword, statusMessage, handleLogin }) {
  // useNavigate hook is used for programmatically navigating to different routes.
  const navigate = useNavigate();

  // State to manage the "Remember Me" checkbox
  const [rememberMe, setRememberMe] = React.useState(false);

  // The fixed username and password for a successful login
  const fixedUsername = 'user';
  const fixedPassword = 'pass';

  // Function to handle the form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === fixedUsername && password === fixedPassword) {
      // Navigate to the quiz page on successful login
      navigate('/selection');
    } else {
      // In a real application, you would handle this with a status message
      // or error handling state.
      alert('Invalid username or password.');
    }
  };

  return (
    // Main container with full screen height and dark background.
    // Flexbox is used to center the login card vertically and horizontally.
    // The p-4 class provides a consistent padding on all screen sizes.
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

      {/* Login form container. It's a "card" that stands out from the background. */}
      {/* On small screens, it takes the full width, but on larger screens (md), */}
      {/* it has a maximum width of 24rem (sm) to keep the form compact. */}
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-screen-md mx-auto">
        {/*
         * Responsive Typography:
         * The heading is 4xl by default (mobile-first) and scales up to 5xl on medium screens (md:).
         * This ensures the title looks good on all devices.
         */}
        <h2 className="text-4xl font-extrabold text-purple-700 md:text-5xl text-center mb-2">
          Knowledge Quest
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-400 font-medium mb-8">
          Where every answer is an adventure
        </p>

        {/* The login form itself */}
        <form onSubmit={handleLoginSubmit}>
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
          <div className="mb-4">
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

          {/* Remember Me checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Log In
          </button>
        </form>

        {/*
         * Display a status message if one exists.
         * The text color is dynamically changed based on the message content.
         */}
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
