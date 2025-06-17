import { useState } from "react";
import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "./Modal";

const BoardGrid = ({ filterValue, searchTerm, boards, setBoards }) => {

    // type of content modal should display (here, hidden or add-board)
    const [modalMode, setModalMode] = useState("hidden");

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

    // add a board and reload boards
    const addBoard = (formInput) => {
        fetch("http://localhost:3000/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                created: new Date(),
                title: formInput.title,
                author: formInput.author === "" ? null : formInput.author,
                category: formInput.category,
                imgSrc: formInput.imgSrc,
                imgAlt: formInput.imgAlt,
            }),
        })
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error adding board: ${error}`));
    };

    // delete a board with the specified id and reload boards
    const deleteBoard = (id) => {
        fetch(`http://localhost:3000/boards/${id}`, {
            method: "DELETE",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error deleting board: ${error}`));
    };

    return (
        <>
            <Modal
                mode={modalMode}
                setMode={setModalMode}
                addBoard={addBoard}></Modal>
            <section className={styles["board-grid"]}>
                <div
                    className={styles["add-board-button"]}
                    onClick={() => setModalMode("add-board")}>
                    <AddRoundedIcon sx={{ fontSize: "48px" }}></AddRoundedIcon>
                </div>
                {getFilteredBoards()
                    .filter(hasTitleIgnoreCase)
                    .map((board) => (
                        <BoardCover
                            key={board.id}
                            board={board}
                            deleteBoard={deleteBoard}></BoardCover>
                    ))}
            </section>
        </>
    );
};

export default BoardGrid;
