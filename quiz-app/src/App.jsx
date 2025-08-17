import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';

function App() {
  // State variables to hold the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State for a message to show the user after they try to log in
  const [statusMessage, setStatusMessage] = useState('');

  // Function to handle the form submission
  const handleLogin = (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    if (username === 'user' && password === 'pass') {
      setStatusMessage('Login successful!');
    } else {
      setStatusMessage('Invalid username or password.');
    }

    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        {/* Pass state variables and handler as props to the Login component */}
        <Route 
          path="/login" 
          element={
            <Login 
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              statusMessage={statusMessage}
              handleLogin={handleLogin}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;