import styles from "../css/BoardCover.module.css"

const BoardCover = ({ title, imgSrc, imgAlt }) => {

    return (
        <div className={styles["board-cover"]}>
            <img className={styles["board-cover-gif"]} src={imgSrc} alt={imgAlt}></img>
            <h2 className={styles["board-cover-title"]}>{title}</h2>
        </div>
    )
}

export default BoardCover;