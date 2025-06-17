import styles from "../css/Card.module.css";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

const Card = ({ card, upvoteCard }) => {
    return (
        <div className={styles["card"]}>
            <iframe
                className={styles["card-gif"]}
                src={card.imgSrc}
                alt={card.imgAlt}></iframe>
            <div className={styles["card-info"]}>
                <h3 className={styles["message"]}>{card.message}</h3>
                <p className={styles["author"]}>
                    - {card.author ?? "Anonymous"}
                </p>
                <div className={styles["card-buttons"]}>
                    <div className={styles["upvote-container"]}>
                        <ForwardRoundedIcon
                            sx={{ fontSize: "32px" }}
                            className={styles["upvote-button"]}
                            onClick={() =>
                                upvoteCard(card.id)
                            }></ForwardRoundedIcon>
                        <p className={styles["upvotes"]}>{card.upvotes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
