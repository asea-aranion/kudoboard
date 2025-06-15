import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";

const BoardGrid = ({ filterValue, searchTerm, boards }) => {
    // returns array of boards matching filterValue criteria (6 most recent, "thank you" category, etc.)
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

    // true if board's title contains searchTerm ignoring case, false otherwise
    const hasTitleIgnoreCase = (board) => {
        return board.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    return (
        <section className={styles["board-grid"]}>
            {getFilteredBoards()
                .filter(hasTitleIgnoreCase)
                .map((board) => (
                    <BoardCover
                        key={board.id}
                        board={board}></BoardCover>
                ))}
        </section>
    );
};

export default BoardGrid;
