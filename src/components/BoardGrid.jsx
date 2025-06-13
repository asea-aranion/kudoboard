import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";

const BoardGrid = ({ filterValue, boards }) => {
    const getFilteredBoards = () => {
        switch (filterValue) {
            case "Recent":
                return boards
                    .toSorted(
                        (a, b) => new Date(b.created) - new Date(a.created),
                    )
                    .slice(0, 6);
            case "All":
                return boards;
            default:
                return boards.filter((board) => board.category === filterValue);
        }
    };

    return (
        <section className={styles["board-grid"]}>
            {getFilteredBoards().map((board) => (
                <BoardCover
                    key={board.id}
                    board={board}></BoardCover>
            ))}
        </section>
    );
};

export default BoardGrid;
