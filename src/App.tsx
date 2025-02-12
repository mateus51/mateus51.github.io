import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './App.css'
import Quiz from './quiz/Quiz'
import BabyShower from './babyshower/BabyShower'
import QuizQuestions from './quiz/QuizQuestions'
import Results from './results/Results'

export const UserContext = React.createContext({});

type BabyShowerContextType = {
  guess: string | null;
  answers: Array<{
    questionId: string;
    choice: string;
    correctChoice: string
  }>
}

const loadContextFromLocalStorage = (): BabyShowerContextType => {
  try {
    const contextData = localStorage.getItem("babyShowerContextData");
    if (contextData) {
      return JSON.parse(contextData);
    }
  } catch (error) {
    console.error("Error while loading context from local storage: ", error);
  }

  console.warn("Context not found on local storage...");
  return {
    "guess": null,
    "answers": []
  };
}

const saveToLocalStorage = (data: BabyShowerContextType) => {
  localStorage.setItem("babyShowerContextData", JSON.stringify(data));
}

const App = () => {
  const [babyShowerContext, setBabyShowerContext] = useState<BabyShowerContextType>(loadContextFromLocalStorage);
  const location = useLocation();

  const setGuess = (guessOption: any) => {
    setBabyShowerContext((previousState: any) => ({
      ...previousState,
      guess: guessOption
    }));
  }

  const addAnswer = (questionId: any, choice: any, correctChoice: any) => {
    setBabyShowerContext((previousState: any) => ({
      ...previousState,
      answers: [
        ...previousState.answers,
        { questionId, choice, correctChoice }
      ]
    }));
  };

  useEffect(() => {
    saveToLocalStorage(babyShowerContext);
  }, [babyShowerContext]);

  useEffect(() => {
    if (location.pathname === "/") {
      setBabyShowerContext({
        guess: null,
        answers: []
      });
      localStorage.removeItem("quiz_state");
    }
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ babyShowerContext, setGuess, addAnswer }}>
      <Routes>
        <Route path="/" element={<BabyShower />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/questions" element={<QuizQuestions />}></Route>
        <Route path="/results" element={<Results />}></Route>
      </Routes>
    </UserContext.Provider>
  )
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default AppWrapper;
