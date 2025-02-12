import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { fetchQuestions } from "../api/questionsApi";
import "./QuizQuestions.css";
import PreResults from "../results/PreResults";

const NUMBER_OF_QUESTIONS = 3;
const STORAGE_KEY = "quiz_state"; // Key for localStorage

const QuizQuestions = () => {
    const { babyShowerContext, addAnswer } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        "id": "",
        "optionText": ""
    });

    // Retrieve questions either from localStorage or API
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

        if (savedState.questions) {
            setQuestions(savedState.questions);
            setCurrentQuestionIndex(savedState.currentQuestionIndex || 0);
            setUserAnswers(savedState.userAnswers || []);
            setIsLoading(false);
        } else {
            retrieveQuestions(setQuestions, setError, setIsLoading);
        }

    }, []);

    // Updates the state on local storage on every answer
    useEffect(() => {
        if (questions.length > 0) {
            const currentState = {
                "questions": questions,
                "currentQuestionIndex": currentQuestionIndex,
                "userAnswers": userAnswers
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
        }
    }, [questions, currentQuestionIndex, userAnswers]);

    const handleOptionSelect = (option: any) => {
        setSelectedOption(option);
    };

    const handleConfirm = () => {
        if (!selectedOption) {
            return;
        }

        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(updatedAnswers);


        // Move to the next question and restore the previously selected answer
        
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < NUMBER_OF_QUESTIONS) {
            const selectedOpt = updatedAnswers[nextIndex] || {"id": "", "optionText": ""}
            setSelectedOption(selectedOpt);
            setCurrentQuestionIndex(nextIndex);
        } else {
            setHasCompleted(true);
        }

        addAnswer(currentQuestion.questionId, selectedOption.id, currentQuestion.correctOption);
    };

    
    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            let previousQuestionIdx = currentQuestionIndex - 1;
            const selectedOpt = userAnswers[previousQuestionIdx] || {"id": "", "optionText": ""}
            setSelectedOption(selectedOpt);
            setCurrentQuestionIndex((prev) => prev - 1)
        }
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (hasCompleted) {
        return <PreResults></PreResults>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    if (questions.length === 0) {
        return <div>Sem perguntas disponíveis</div>
    }

    return (
        <div>
            <p>Seu palpite é: {babyShowerContext.guess}</p>
            <h3>Pergunta {currentQuestionIndex + 1} de {NUMBER_OF_QUESTIONS} </h3>

            <h2>{currentQuestion.title}</h2>
            {
                currentQuestion.options.map((option) => (
                    <div>
                        <button
                            key={option.id}
                            className={`quiz-option-button ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(option)}>
                            {option.optionText}
                        </button>
                        <br />
                    </div>
                ))
            }


            <div className="quiz-buttons">
                <button
                    className="quiz-back-button"
                    disabled={currentQuestionIndex === 0}
                    onClick={handleBack}>
                    Voltar
                </button>

                <button
                    className={`quiz-confirm-button ${selectedOption.id !== "" ? 'active' : 'disabled'}`}
                    onClick={handleConfirm}
                    disabled={!selectedOption?.id}>
                    Próxima
                </button>
            </div>
        </div>
    )
}

export default QuizQuestions;

function retrieveQuestions(setQuestions: any, setError: any, setIsLoading: any) {
    const loadQuestions = async () => {
        try {
            const data = await fetchQuestions();

            setQuestions(data);
        } catch (err) {
            setError("Failed to load questions");
        } finally {
            setIsLoading(false);
        }
    };

    loadQuestions();
}