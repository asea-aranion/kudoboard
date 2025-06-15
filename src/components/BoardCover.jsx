import styles from "../css/BoardCover.module.css";
import { useNavigate } from "react-router-dom";

const BoardCover = ({ board }) => {
    const navigate = useNavigate();

    const navigateToBoard = () => {
        navigate(`/board?id=${board.id}`);
    };

    return (
        <div
            className={styles["board-cover"]}
            onClick={navigateToBoard}>
            <img
                className={styles["board-cover-gif"]}
                src={board.imgSrc}
                alt={board.imgAlt}></img>
            <h2 className={styles["board-cover-title"]}>{board.title}</h2>
        </div>
    );
};

export default BoardCover;
