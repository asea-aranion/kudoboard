import { useEffect, useState } from "react";
import styles from "../css/BoardPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardGrid from "./CardGrid";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "./Modal";

const BoardPage = () => {
    // get id of this board
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    // state of board details and board's cards
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState(Array());

    // type of form modal should display
    const [modalMode, setModalMode] = useState("add-card");

    const navigate = useNavigate();

    // load details of board
    const fetchBoardData = () => {
        fetch(`http://localhost:3000/boards/${boardId}`)
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
        fetch(`http://localhost:3000/board/cards/${boardId}`)
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
        fetch(`http://localhost:3000/card/upvote/${cardId}`, {
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

    // add card to database and update display
    const addCard = (formInput) => {
        fetch(`http://localhost:3000/board/cards/${boardId}`, {
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

    // delete specified card from database and update display
    const deleteCard = (cardId) => {
        fetch(`http://localhost:3000/card/${cardId}`, {
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

    // show modal with specified form type; disable scrolling behind
    const showModal = (newMode) => {
        setModalMode(newMode);
        document.querySelector("#overlay").style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
    };

    // hide modal and enable scrolling behind
    const hideModal = () => {
        document.querySelector("#overlay").style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
    };

    // fetch data on page load
    useEffect(() => {
        fetchBoardData();
        fetchCards();
    }, []);

    if (board) {
        return (
            <>
                <Modal
                    mode={modalMode}
                    hideModal={hideModal}
                    addCard={addCard}></Modal>
                <div className={styles["title-container"]}>
                    <button
                        className={styles["back-button"]}
                        onClick={() => navigate("/")}>
                        <ArrowBackRoundedIcon></ArrowBackRoundedIcon>{" "}
                        <p className={styles["back-button-text"]}>Back</p>
                    </button>
                    <h2>{board.title}</h2>
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
                    onClick={() => showModal("add-card")}>
                    <AddRoundedIcon></AddRoundedIcon>
                    <p className={styles["add-button-text"]}>Add Card</p>
                </button>
                <CardGrid
                    cards={cards}
                    upvoteCard={upvoteCard}
                    deleteCard={deleteCard}></CardGrid>
            </>
        );
    } else {
        return <></>;
    }
};

export default BoardPage;
