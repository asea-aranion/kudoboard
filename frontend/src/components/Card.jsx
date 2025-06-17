import styles from "../css/Card.module.css";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const Card = ({ card, upvoteCard, deleteCard, pinCard }) => {
    return (
        <div className={styles["card"]}>
            <div className={styles["pin-button-container"]}>
                <p className={styles["pin-text"]}>
                    {card.pinDate ? "Unpin" : "Pin"}
                </p>
                {card.pinDate ? (
                    <PushPinRoundedIcon
                        onClick={() => pinCard(card.id)}></PushPinRoundedIcon>
                ) : (
                    <PushPinOutlinedIcon
                        onClick={() => pinCard(card.id)}></PushPinOutlinedIcon>
                )}
            </div>
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
                    <DeleteRoundedIcon
                        className={styles["delete-button"]}
                        sx={{ fontSize: "32px" }}
                        onClick={() => deleteCard(card.id)}></DeleteRoundedIcon>
                </div>
            </div>
        </div>
    );
};

export default Card;
