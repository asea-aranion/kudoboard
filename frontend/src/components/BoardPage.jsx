import { useEffect, useState } from "react";
import styles from "../css/BoardPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardGrid from "./CardGrid";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const BoardPage = () => {
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState(Array());

    const navigate = useNavigate();

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

    useEffect(() => {
        fetchBoardData();
        fetchCards();
    }, []);

    if (board) {
        return (
            <>
                <div className={styles["title-container"]}>
                    <button
                        className={styles["back-button"]}
                        onClick={() => navigate("/")}>
                        <ArrowBackRoundedIcon></ArrowBackRoundedIcon>{" "}
                        <p className={styles["back-button-text"]}>Back</p>
                    </button>
                    <h2>{board.title}</h2>
                </div>
                <div className={styles["details-container"]}>
                    <p className={styles["detail"]}>{board.category}</p>
                    <p className={styles["detail"]}>
                        by {board.author ?? "Anonymous"}
                    </p>
                </div>
                <CardGrid
                    cards={cards}
                    upvoteCard={upvoteCard}></CardGrid>
            </>
        );
    } else {
        return <></>;
    }
};

export default BoardPage;
