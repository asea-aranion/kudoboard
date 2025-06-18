import styles from "../css/BoardCover.module.css";
import { useNavigate } from "react-router-dom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const BoardCover = ({ board, deleteBoard }) => {
    // open board page when a board is clicked
    const navigate = useNavigate();
    const navigateToBoard = () => {
        navigate(`/board?id=${board.id}`);
    };

    // delete a board when trash icon is clicked
    const handleDelete = (event) => {
        event.stopPropagation();
        deleteBoard(board.id);
    };

    return (
        <div
            className={styles["board-cover"]}
            onClick={navigateToBoard}>
            <iframe
                className={styles["board-cover-gif"]}
                src={board.imgSrc}
                title={board.imgAlt}></iframe>
            <h2 className={styles["board-cover-title"]}>{board.title}</h2>
            <DeleteRoundedIcon
                sx={{ fontSize: "40px" }}
                className={styles["delete-board-button"]}
                onClick={handleDelete}></DeleteRoundedIcon>
        </div>
    );
};

export default BoardCover;
