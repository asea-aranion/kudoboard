import { useRef, useState } from "react";
import styles from "../css/Modal.module.css";
import CardComments from "./CardComments";
import AddBoardForm from "./AddBoardForm";
import AddCardForm from "./AddCardForm";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = ({ mode, setMode, addBoard, addCard, cardInfo }) => {
    const overlayRef = useRef(null);

    const [showingAlert, setShowingAlert] = useState(false);

    // hide overlay and modal if overlay itself is clicked
    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            setMode("hidden");
            setShowingAlert(false);
        }
    };

    // depending on mode, populate modal text and form inputs
    switch (mode) {
        case "add-board":
            document.querySelector("body").style.overflow = "hidden";
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    {showingAlert ? (
                        <div className={styles["alert"]}>
                            <CloseRoundedIcon
                                sx={{ fontSize: "32px" }}></CloseRoundedIcon>
                            <p className={styles["alert-text"]}>
                                All fields except author are required.
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>add board</h2>
                        <AddBoardForm
                            addBoard={addBoard}
                            setMode={setMode}
                            setShowingAlert={setShowingAlert}></AddBoardForm>
                    </div>
                </div>
            );
        case "add-card":
            document.querySelector("body").style.overflow = "hidden";
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    {showingAlert ? (
                        <div className={styles["alert"]}>
                            <CloseRoundedIcon
                                sx={{ fontSize: "32px" }}></CloseRoundedIcon>
                            <p className={styles["alert-text"]}>
                                All fields except author are required.
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>add card</h2>
                        <AddCardForm
                            addCard={addCard}
                            setMode={setMode}
                            setShowingAlert={setShowingAlert}></AddCardForm>
                    </div>
                </div>
            );
        case "comments":
            document.querySelector("body").style.overflow = "hidden";
            return (
                <div
                    id="overlay"
                    className={styles["overlay"]}
                    ref={overlayRef}
                    onClick={handleOverlayClick}>
                    {showingAlert ? (
                        <div className={styles["alert"]}>
                            <CloseRoundedIcon
                                sx={{ fontSize: "32px" }}></CloseRoundedIcon>
                            <p className={styles["alert-text"]}>
                                All fields except author are required.
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className={styles["modal"]}>
                        <h2 className={styles["title"]}>comments</h2>
                        <div className={styles["split-container"]}>
                            <div className={styles["card-info-container"]}>
                                <iframe
                                    className={styles["card-gif"]}
                                    src={cardInfo.imgSrc}
                                    title={cardInfo.imgAlt}></iframe>
                                <h3 className={styles["card-message"]}>
                                    {cardInfo.message}
                                </h3>
                                <p className={styles["card-author"]}>
                                    - {cardInfo.author ?? "Anonymous"}
                                </p>
                            </div>
                            <CardComments
                                cardId={cardInfo.id}
                                setShowingAlert={
                                    setShowingAlert
                                }></CardComments>
                        </div>
                    </div>
                </div>
            );
        default:
            document.querySelector("body").style.overflow = "scroll";
            return <></>;
    }
};

export default Modal;
