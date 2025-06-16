import { useEffect, useState } from "react";
import styles from "../css/BoardPage.module.css";
import { useSearchParams } from "react-router-dom";

const BoardPage = () => {
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    const [board, setBoard] = useState(null);

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

    useEffect(fetchBoardData, []);

    if (board) {
        return (
            <>
                <h2 className={styles["title"]}>{board.title}</h2>
                <div className={styles["details-container"]}>
                    <p className={styles["detail"]}>{board.category}</p>
                    <p className={styles["detail"]}>by {board.author ?? "Anonymous"}</p>
                </div>
            </>
        )
    } else {
        return <></>
    }
};

export default BoardPage;
