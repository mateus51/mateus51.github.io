import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Results.css"
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

function calculateNumberOfRightAnswers(babyShowerContext: any) {
    return babyShowerContext.answers
        .filter((answer: any) => answer != null && answer.choice != null && answer.correctChoice != null)
        .map((answer: any) => answer.choice === answer.correctChoice ? 1 : 0)
        .reduce((accumulator: any, init: any) => accumulator + init, 0);
}

const Results = () => {
    const [isCalculating, setIsCalculating] = useState(true);
    const { babyShowerContext } = useContext(UserContext);
    const MINIMUM_RIGHT_ANSWERS = 2;
    const RIGHT_GUESS = "Menina";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCalculating(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [])

    if (hasNoAnswersFilled(babyShowerContext)) {
        console.error("error - should redirect to begin page", babyShowerContext);
        return (
            <div>
                <h2>Opa, não encontrei suas respostas!</h2>

                <h3>Porque você não joga de novo?</h3>
                <Link to="/">Jogar de novo</Link>
            </div>
        )
    }

    if (isCalculating) {
        return (
            <div>
                <h2>Calculando sua pontuação...</h2>
                <div className={"loader"}></div>
            </div>
        )
    }
    const numberOfCorrectAnswers = calculateNumberOfRightAnswers(babyShowerContext);
    const shouldShowAnswer = numberOfCorrectAnswers >= MINIMUM_RIGHT_ANSWERS;

    if (shouldShowAnswer && babyShowerContext.guess === RIGHT_GUESS) {
        return (
            <div>
                <Confetti
                    colors={["#ffc0cb"]}>

                </Confetti>
                <h1>Você acertou!</h1>
                <h1>É menina!</h1>
                <img style={{ maxHeight: "300px", maxWidth: "300px" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb7o-7NIKvZS_KGnVqVOJMJhjVU71ulKkWGg&s"></img>

                <br />
                <Link to="/">Jogar de novo</Link>
            </div>
        )
    } else if (shouldShowAnswer && babyShowerContext.guess !== RIGHT_GUESS) {
        return (
            <div>
                <h2>Você acertou as perguntas, mas errou o palpite!</h2>
                <h1>É menina!</h1>
                <img style={{ maxHeight: "300px", maxWidth: "300px" }}
                    src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WZEUY7Q6GMI6ZPVIGCHKCNCZJ4.jpg&w=1800&h=1800"></img>

                <br />
                <Link to="/">Jogar de novo</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Não foi dessa vez!</h1>
            <h2>Você acertou {numberOfCorrectAnswers || 0} de 10 perguntas</h2>
            <h2>Tente novamente!</h2>

            <br />
            <Link to="/">Jogar de novo</Link>
        </div>
    )
};

export default Results;

function hasNoAnswersFilled(babyShowerContext: any) {
    const MINIMUM_ANSWERS_QUANTITY = 3;
    return babyShowerContext == null ||
        babyShowerContext.answers == null ||
        babyShowerContext.answers.length <= 0 || babyShowerContext.answers.length < MINIMUM_ANSWERS_QUANTITY;
}
