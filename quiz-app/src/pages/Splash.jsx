import React from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 ">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
           
           <div className="top-16 absolute bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50">
                {/* Logo/Icon */}
                <img src="/b2-new.png" alt="Logo" className="w-24 h-24 mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 " />
            </div>

            <div className="mt-30 mb-10 text-center">
                {/* App Title */}
                <h1 className="text-3xl md:text-5xl font-extrabold mt-32 text-purple-700  mb-2">Knowledge Quest</h1>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl mt-2 text-gray-400 font-medium">
                Where every answer is an adventure
                </p>
            </div>

            <div className="mt-18 ">
                {/* Start Quiz Button */}
                <button
                onClick={() => navigate("/login")}
                className=" px-8 py-3 text-lg rounded-full shadow-lg transition 
                            text-black hover:text-white"
                style={{
                    backgroundColor: "#ff8d28",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#085F57")} // darker teal
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff8d28")}
                >
                Get Started
                </button>
           </div>

        </div>

      
    </div>
  );
};



export default Splash;