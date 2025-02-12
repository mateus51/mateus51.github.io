import { Link } from "react-router-dom";

const PreResults = () => {
    return (
        <div>
            <h1>Você respondeu o mínimo de questões!</h1>

            <h2>Mas será que foi o suficiente??</h2>
            <h2>Clique no botão abaixo e descubra!</h2>

            <button><Link to="/results">Descobrir!</Link></button>
        </div>
    )
};

export default PreResults;