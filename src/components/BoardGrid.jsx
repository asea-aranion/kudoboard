import styles from "../css/BoardGrid.module.css";
import BoardCover from "./BoardCover";

const BoardGrid = (props) => {

    // placeholder
    const cowGif = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRoYnc0MWFjcWhmY2FzMmV6ODVoMzR1djkyeWNnN3VzbWo5cW1mNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QIma0G0GMja3LrGVYL/giphy.gif";
    const cowAlt = "Pixel art of a cartoon cow driving a motorcycle"

    return (
        <section className={styles["board-grid"]}>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Hello" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
            <BoardCover title="Title" imgSrc={cowGif} imgAlt={cowAlt}></BoardCover>
        </section>
    )
}

export default BoardGrid;