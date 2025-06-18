import { useRef } from "react";
import styles from "../css/Modal.module.css";
import CardComments from "./CardComments";
import AddBoardForm from "./AddBoardForm";
import AddCardForm from "./AddCardForm";

const Modal = ({ mode, setMode, addBoard, addCard, cardInfo }) => {
    const overlayRef = useRef(null);

    // hide overlay and modal if overlay itself is clicked
    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            setMode("hidden");
        }
    };

    // depending on mode, populate modal text and form inputs
    switch (mode) {
        case "add-board":
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>add board</h2>
                        <AddBoardForm
                            addBoard={addBoard}
                            setMode={setMode}></AddBoardForm>
                    </div>
                </div>
            );
        case "add-card":
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>add card</h2>
                        <AddCardForm
                            addCard={addCard}
                            setMode={setMode}></AddCardForm>
                    </div>
                </div>
            );
        case "comments":
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>comments</h2>
                        <div className={styles["split-container"]}>
                            <div className={styles["card-info-container"]}>
                                <iframe
                                    className={styles["card-gif"]}
                                    src={cardInfo.imgSrc}
                                    alt={cardInfo.imgAlt}></iframe>
                                <h3 className={styles["card-message"]}>
                                    {cardInfo.message}
                                </h3>
                                <p className={styles["card-author"]}>
                                    - {cardInfo.author ?? "Anonymous"}
                                </p>
                            </div>
                            <CardComments cardId={cardInfo.id}></CardComments>
                        </div>
                    </div>
                </div>
            );
        default:
            return <></>;
    }
};

export default Modal;
