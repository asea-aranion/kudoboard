import styles from "../css/Card.module.css"

const Card = ({ card }) => {
    return (
        <div className={styles["card"]}>
            <iframe className={styles["card-gif"]} src={card.imgSrc} alt={card.imgAlt}></iframe>
            <div className={styles["card-info"]}>
                <h3 className={styles["message"]}>{card.message}</h3>
                <p className={styles["author"]}>- {card.author ?? "Anonymous"}</p>
            </div>
            
        </div>
    )
}

export default Card;