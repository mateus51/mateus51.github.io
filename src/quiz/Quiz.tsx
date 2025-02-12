import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useState } from "react";
import { useContext } from "react";

const Quiz = () => {
    const { setGuess } = useContext(UserContext);
    const [selectedGuess, setSelectedGuess] = useState("");
    const girlHexCode = "#eb34ba";
    const boyHexCode = "#34bdeb";

    const submitGuess = (guess: string) => {
        setGuess(guess)
    };

    return (
        <div>
            <Link to="/">Voltar</Link>
            <h1>Chá revelação</h1>

            <h3>Qual seu palpite?</h3>
            <button onClick={() => setSelectedGuess("Menino")}> Menino </button>
            <button onClick={() => setSelectedGuess("Menina")}> Menina </button>

            <br></br>
            {selectedGuess !== "" ? (<Link to="/questions">
                <button
                    onClick={() => submitGuess(selectedGuess)}
                    style={{ backgroundColor: selectedGuess === "Menino" ? boyHexCode : girlHexCode }}>
                    Responder </button>
            </Link>)
                : (<button
                    disabled
                    style={{ backgroundColor: '#adadad' }}>
                    Responder </button>
                )}
        </div>
    )
};

export default Quiz;