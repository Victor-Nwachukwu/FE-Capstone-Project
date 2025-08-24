import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component to display a single quiz category card
const QuizCategoryCard = ({ title, description, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center ${
        isSelected ? 'border-2 border-purple-500' : 'border-2 border-transparent'
      }`}
    >
      <h3 className="text-xl font-bold text-purple-400 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

// Component to display a single difficulty button
const DifficultyButton = ({ level, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${
        isSelected
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {level}
    </button>
  );
};

// Main component for the quiz selection page
export default function QuizSelectionPage() {
  const navigate = useNavigate();

  // State to track the selected category and difficulty
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Array of quiz categories with their details
  const categories = [
    { id: 'general-knowledge', title: 'General Knowledge', description: 'Test your knowledge on a wide range of topics.' },
    { id: 'science-nature', title: 'Science & Nature', description: 'Explore the natural world and scientific principles.' },
    { id: 'english-language', title: 'English Language', description: 'Challenge your grammar, vocabulary, and literary skills.' },
    { id: 'arts-literature', title: 'Arts & Literature', description: 'Dive into the world of creative expression and stories.' },
  ];

  // Function to handle a category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  // Function to handle a difficulty level selection
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  // Function to start the quiz
  const handleStartQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      // Navigate to the quiz page with both category and difficulty in the URL
      // The route for this page should be something like '/quiz/:categoryId/:difficulty'
      navigate(`/quiz/${selectedCategory}/${selectedDifficulty}`);
    } else {
      alert('Please select a category and a difficulty level to start the quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      
      {/* Quiz Category Selection Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-2">
          Choose a Quiz Category
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          Select a topic to start your adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-10">
        {categories.map((category) => (
          <QuizCategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            onClick={() => handleCategoryClick(category.id)}
            isSelected={selectedCategory === category.id}
          />
        ))}
      </div>
      
      {/* Difficulty Level Selection Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
          Select a Difficulty
        </h2>
        <div className="flex justify-center flex-wrap gap-4">
          <DifficultyButton
            level="Easy"
            onClick={() => handleDifficultyClick('easy')}
            isSelected={selectedDifficulty === 'easy'}
          />
          <DifficultyButton
            level="Medium"
            onClick={() => handleDifficultyClick('medium')}
            isSelected={selectedDifficulty === 'medium'}
          />
          <DifficultyButton
            level="Hard"
            onClick={() => handleDifficultyClick('hard')}
            isSelected={selectedDifficulty === 'hard'}
          />
        </div>
      </div>
      
      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedCategory || !selectedDifficulty}
      >
        Start Quiz
      </button>

    </div>
  );
}
