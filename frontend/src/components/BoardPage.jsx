import { useEffect, useState } from "react";
import styles from "../css/BoardPage.module.css";
import { useSearchParams } from "react-router-dom";
import CardGrid from "./CardGrid";

const BoardPage = () => {
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState(Array());

    const fetchBoardData = () => {
        fetch(`http://localhost:3000/boards/${boardId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                } else {
                    return response.json();
                }
            })
            .then(json => setBoard(json))
            .catch(error => console.error(`Error fetching board ${boardId}: ${error}`))
    };

    const fetchCards = () => {
        fetch(`http://localhost:3000/board/cards/${boardId}`)
        .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                } else {
                    return response.json();
                }
            })
            .then(json => {setCards(json)
                console.log(json)
            })
            .catch(error => console.error(`Error fetching cards for ${boardId}: ${error}`))
    }

    useEffect(() => {
        fetchBoardData()
        fetchCards()
    }, []);

    if (board) {
        return (
            <>
                <h2 className={styles["title"]}>{board.title}</h2>
                <div className={styles["details-container"]}>
                    <p className={styles["detail"]}>{board.category}</p>
                    <p className={styles["detail"]}>by {board.author ?? "Anonymous"}</p>
                </div>
                <CardGrid cards={cards}></CardGrid>
            </>
        )
    } else {
        return <></>
    }
};

export default BoardPage;
