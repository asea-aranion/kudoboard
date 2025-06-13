import styles from "../css/BoardCover.module.css";

const BoardCover = ({ board }) => {
    return (
        <div className={styles["board-cover"]}>
            <img
                className={styles["board-cover-gif"]}
                src={board.imgSrc}
                alt={board.imgAlt}></img>
            <h2 className={styles["board-cover-title"]}>{board.title}</h2>
        </div>
    );
};

export default BoardCover;
