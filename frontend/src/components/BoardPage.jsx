import { useEffect, useState } from "react";
import styles from "../css/BoardPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardGrid from "./CardGrid";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "./Modal";
import ColorSchemePicker from "./ColorSchemePicker";

const BoardPage = () => {
    // get id of this board
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    // state of board details and board's cards
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState(Array());

    // type of content modal should display (here, hidden or add-card)
    const [modalMode, setModalMode] = useState("hidden");

    // true if site is using dark css colors
    const [inDarkMode, setInDarkMode] = useState(
        document.documentElement.style.getPropertyValue("--tan-background") ===
            "rgb(80, 69, 46)",
    );

    const navigate = useNavigate();

    // load details of board
    const fetchBoardData = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/boards/${boardId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => setBoard(json))
            .catch((error) =>
                console.error(`Error fetching board ${boardId}: ${error}`),
            );
    };

    // load cards associated with this board
    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/board/cards/${boardId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                setCards(json);
            })
            .catch((error) =>
                console.error(`Error fetching cards for ${boardId}: ${error}`),
            );
    };

    // increment number of upvotes for specified card and update display
    const upvoteCard = (cardId) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/card/upvote/${cardId}`, {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                }
            })
            .then(fetchCards)
            .catch((error) =>
                console.error(`Error updating card ${cardId}: ${error}`),
            );
    };

    // delete specified card from database and update display
    const deleteCard = (cardId) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/card/${cardId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                }
            })
            .then(fetchCards)
            .catch((error) =>
                console.error(`Error deleting card ${cardId}: ${error}`),
            );
    };

    // add card to database and update display
    const addCard = (formInput) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/board/cards/${boardId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                message: formInput.message,
                author: formInput.author === "" ? null : formInput.author,
                imgSrc: formInput.imgSrc,
                imgAlt: formInput.imgAlt,
                upvotes: 0,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => setCards(json))
            .catch((error) => console.error(`Error adding card: ${error}`));
    };

    // pin specified card with pin date now and update display
    const pinCard = (cardId) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/card/pin/${cardId}`, {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                }
            })
            .then(fetchCards)
            .catch((error) =>
                console.error(`Error pinning card ${cardId}: ${error}`),
            );
    };

    // fetch data on page load
    useEffect(() => {
        fetchBoardData();
        fetchCards();
    }, []);

    if (board) {
        return (
            <>
                <ColorSchemePicker
                    inDarkMode={inDarkMode}
                    setInDarkMode={setInDarkMode}></ColorSchemePicker>
                <Modal
                    mode={modalMode}
                    setMode={setModalMode}
                    addCard={addCard}></Modal>
                <div className={styles["title-container"]}>
                    <button
                        className={styles["back-button"]}
                        onClick={() => navigate("/")}>
                        <ArrowBackRoundedIcon></ArrowBackRoundedIcon>{" "}
                        <p className={styles["back-button-text"]}>Back</p>
                    </button>
                    <h2 className={styles["title"]}>{board.title}</h2>
                    <div className={styles["detail-container"]}>
                        <LabelRoundedIcon
                            sx={{ fontSize: "36px" }}></LabelRoundedIcon>
                        <p className={styles["detail"]}>{board.category}</p>
                        <PersonRoundedIcon
                            sx={{ fontSize: "36px" }}></PersonRoundedIcon>
                        <p className={styles["detail"]}>
                            {board.author ?? "Anonymous"}
                        </p>
                    </div>
                </div>
                <button
                    className={styles["add-card-button"]}
                    onClick={() => setModalMode("add-card")}>
                    <AddRoundedIcon></AddRoundedIcon>
                    <p className={styles["add-button-text"]}>Add Card</p>
                </button>
                <CardGrid
                    cards={cards}
                    upvoteCard={upvoteCard}
                    deleteCard={deleteCard}
                    pinCard={pinCard}></CardGrid>
            </>
        );
    } else {
        return <></>;
    }
};

export default BoardPage;
