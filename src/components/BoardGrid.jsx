import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const BoardGrid = ({ filterValue, searchTerm, boards, setBoards }) => {
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

    const addBoard = () => {
        fetch("http://localhost:3000/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                created: new Date(),
                title: "New Board",
                author: null,
                category: "Thank you",
                imgSrc: "",
                imgAlt: "",
            }),
        })
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error adding board: ${error}`));
    };

    return (
        <section className={styles["board-grid"]}>
            <div
                className={styles["add-board-button"]}
                onClick={addBoard}>
                <AddRoundedIcon sx={{ fontSize: "48px" }}></AddRoundedIcon>
            </div>
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
