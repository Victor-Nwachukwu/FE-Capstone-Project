import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * QuizPage component that fetches and displays questions from the Open Trivia DB API.
 * It manages the quiz flow, including a timer, score, and answer submission.
 */
export default function QuizPage() {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();

  // State to hold quiz data
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  
  // State for UI feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Timer state
  const [timer, setTimer] = useState(30);
  const timerId = useRef(null);

  // Cache fetched questions to avoid duplicate API calls
  const cacheRef = useRef({});

  // Map user-friendly category names to their API IDs
  const categoryMap = {
    'general-knowledge': 9,
    'science-nature': 17,
    'english-language': 10,
    'arts-literature': 25,
  };

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param {Array} array - The array to shuffle.
   * @returns {Array} The shuffled array.
   */
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[i], newArray[j]];
    }
    return newArray;
  };
  
  /**
   * Decodes HTML entities in a string.
   * @param {string} text - The string containing HTML entities.
   * @returns {string} The decoded string.
   */
  const decodeHtmlEntities = (text) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
  };

  // Effect to fetch questions from the API
  useEffect(() => {
    const cacheKey = `${category}-${difficulty}`;

    if (cacheRef.current[cacheKey]) {
      setQuestions(cacheRef.current[cacheKey]);
      setLoading(false);
      return;
    }

    const categoryId = categoryMap[category];
    if (!categoryId) {
      setError('Invalid quiz category selected.');
      setLoading(false);
      return;
    }

    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

    const fetchQuestions = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(apiUrl);
        if (response.status === 429 && retries > 0) {
          console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          await fetchQuestions(retries - 1, delay * 2);
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.response_code !== 0) {
          setError('Could not find questions for this category and difficulty. Please try a different selection.');
        } else {
          const decodedQuestions = data.results.map(q => {
            const allAnswers = shuffleArray([...q.incorrect_answers, q.correct_answer]);
            return {
              ...q,
              question: decodeHtmlEntities(q.question),
              correct_answer: decodeHtmlEntities(q.correct_answer),
              all_answers: allAnswers.map(ans => decodeHtmlEntities(ans))
            };
          });
          cacheRef.current[cacheKey] = decodedQuestions;
          setQuestions(decodedQuestions);
        }
      } catch (e) {
        setError(`Failed to fetch questions: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  // Effect to manage the timer countdown
  useEffect(() => {
    if (loading || quizFinished) return;
    
    timerId.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerId.current);
          handleNextQuestion();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [loading, quizFinished, currentQuestionIndex]);

  // Function to move to the next question
  const handleNextQuestion = () => {
    clearInterval(timerId.current);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setTimer(30);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Function to handle answer selection
  const handleAnswerSelect = (answer) => {
    if (!showCorrectAnswer) {
      setSelectedAnswer(answer);
    }
  };
  
  // Function to submit the current answer and check correctness
  const handleSubmitAnswer = () => {
    clearInterval(timerId.current);
    setShowCorrectAnswer(true);
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(prevScore => prevScore + 1);
      setTimeout(handleNextQuestion, 2000);
    } else {
      setTimeout(handleNextQuestion, 3000);
    }
  };
  
  // Function to start from the beginning
  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setLoading(true);
    navigate('/'); // Navigate back to home page
  };

  // Render based on state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-center">Loading quiz questions...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-500 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-bold">Error: {error}</h1>
        <button
          onClick={() => navigate('/selection')}
          className="mt-6 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center  p-4">
        <h1 className="text-4xl md:text-5xl text-center font-extrabold text-purple-600 md:mt-12 mb-12">Quiz Completed Successfully</h1>
        <p className="text-lg md:text-3xl text-gray-400 font-bold mb-10">Big Congratulations To You 👏</p>
        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl ">
          <p className="text-2xl font-bold  text-green-500">You answered 10 questions and got {score} out of {questions.length}. That's a great effort!</p>
        </div>
        <div className="flex space-x-4 mt-10">
          <button
            onClick={handleRetryQuiz}
            className="px-4 py-2  md:px-8 md:py-4 text-lg bg-purple-600 text-black font-bold rounded-lg hover:bg-purple-900 hover:text-white transition-colors"
          >
            Home Page
          </button>
          <button
            onClick={() => navigate('/selection')}
            className="px-4 py-2 md:px-8 md:py-4 text-lg bg-gray-400 text-purple-800 font-bold rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            Select Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null; // Should not happen, but a safe guard

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-lg font-semibold text-gray-400 mb-2 sm:mb-0">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="text-xl font-bold">
            <span className="text-purple-400">Timer:</span> <span className={`font-mono ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>{timer}s</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.question}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.all_answers.map((answer, index) => {
            let buttonClass = 'bg-gray-700 text-gray-300 hover:bg-gray-600';
            if (showCorrectAnswer) {
              if (answer === currentQuestion.correct_answer) {
                buttonClass = 'bg-green-600 text-white';
              } else if (selectedAnswer === answer) {
                buttonClass = 'bg-red-600 text-white';
              }
            } else if (selectedAnswer === answer) {
              buttonClass = 'bg-purple-600 text-white shadow-lg';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={showCorrectAnswer}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${buttonClass}`}
              >
                {answer}
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null || showCorrectAnswer}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
