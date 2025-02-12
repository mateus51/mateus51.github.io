import { Link } from "react-router-dom";

const BabyShower = () => {
    return (
        <div>
            <h1>Chá revelação</h1>

            <h2>Prontos pra descobrir o sexo do bebê?</h2>
            <h2>São 10 perguntas, responda pelo menos 8 corretamente e descubra!</h2>

            <button><Link to="/quiz">Descobrir!</Link></button>
        </div>
    )
};

export default BabyShower;