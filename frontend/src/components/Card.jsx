import styles from "../css/Card.module.css";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useState } from "react";
import Modal from "./Modal";

const Card = ({ card, upvoteCard, deleteCard, pinCard }) => {

    // type of content modal should display (here, hidden or comments)
    const [modalMode, setModalMode] = useState("hidden");

    return (
        <>
            <Modal
                mode={modalMode}
                setMode={setModalMode}></Modal>
            <div className={styles["card"]}>
                <div className={styles["pin-button-container"]}>
                    <p className={styles["pin-text"]}>
                        {card.pinDate ? "Unpin" : "Pin"}
                    </p>
                    {card.pinDate ? (
                        <PushPinRoundedIcon
                            sx={{ fontSize: "32px" }}
                            onClick={() =>
                                pinCard(card.id)
                            }></PushPinRoundedIcon>
                    ) : (
                        <PushPinOutlinedIcon
                            sx={{ fontSize: "32px" }}
                            onClick={() =>
                                pinCard(card.id)
                            }></PushPinOutlinedIcon>
                    )}
                </div>
                <div className={styles["delete-button-container"]}>
                    <p className={styles["delete-text"]}>Delete</p>
                    <DeleteOutlineRoundedIcon
                        className={styles["delete-button"]}
                        sx={{ fontSize: "32px" }}
                        onClick={() =>
                            deleteCard(card.id)
                        }></DeleteOutlineRoundedIcon>
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
                    <div className={styles["card-footer"]}>
                        <div className={styles["upvote-container"]}>
                            <ForwardRoundedIcon
                                sx={{ fontSize: "32px" }}
                                className={styles["upvote-button"]}
                                onClick={() =>
                                    upvoteCard(card.id)
                                }></ForwardRoundedIcon>
                            <p className={styles["upvotes"]}>{card.upvotes}</p>
                        </div>
                        <button
                            className={styles["comments-button"]}
                            onClick={() => {
                                setModalMode("comments");
                            }}>
                            Comments
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
