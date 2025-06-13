import { useEffect, useState } from "react";
import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";

const BoardGrid = (props) => {
    // array of data representing each board
    const [boards, setBoards] = useState(Array());

    // placeholder data set on page load
    const cowGif =
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRoYnc0MWFjcWhmY2FzMmV6ODVoMzR1djkyeWNnN3VzbWo5cW1mNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QIma0G0GMja3LrGVYL/giphy.gif";
    const cowAlt = "Pixel art of a cartoon cow driving a motorcycle";

    useEffect(
        () =>
            setBoards([
                {
                    id: 0,
                    title: "Teacher Appreciation",
                    category: "Thank you",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: null,
                    cards: [],
                },
                {
                    id: 1,
                    title: "Motivation",
                    category: "Inspiration",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: "Ann",
                    cards: [],
                },
                {
                    id: 2,
                    title: "Happy Birthday",
                    category: "Celebration",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: null,
                    cards: [],
                },
            ]),
        [],
    );

    return (
        <section className={styles["board-grid"]}>
            {boards.map(board => 
                <BoardCover key={board.id} board={board}></BoardCover>
            )}
        </section>
    );
};

export default BoardGrid;
