import styles from "../css/ModalAddForm.module.css";
import { useState } from "react";
import GifPicker from "./GifPicker";

const AddCardForm = ({ addCard, setMode, setShowingAlert }) => {
    // data entered in form
    const [addCardData, setAddCardData] = useState({
        message: "",
        author: null,
        imgSrc: "",
        imgAlt: "",
    });

    // set gif information in addBoardData
    const setGifURL = (imgSrc, imgAlt) => {
        setAddCardData({
            ...addCardData,
            imgSrc: imgSrc,
            imgAlt: imgAlt,
        });
    };

    // add board and hide modal containing this form
    const handleAddSubmit = (event) => {
        event.preventDefault();

        if (!addCardData.message || !addCardData.imgSrc) {
            setShowingAlert(true);
        } else {
            setShowingAlert(false);

            addCard(addCardData);

            setMode("hidden");
        }
    };

    return (
        <>
            <form className={styles["form"]}>
                <div className={styles["label-container"]}>
                    <label htmlFor="message">Message</label>
                    <div className={styles["input-container"]}>
                        <input
                            onChange={(event) => {
                                setAddCardData({
                                    ...addCardData,
                                    message: event.target.value,
                                });
                            }}
                            id="message"
                            type="text"
                            placeholder="New card"
                            required={true}></input>
                    </div>
                </div>
                <div className={styles["label-container"]}>
                    <label htmlFor="author">Author (optional)</label>
                    <div className={styles["input-container"]}>
                        <input
                            onChange={(event) => {
                                setAddCardData({
                                    ...addCardData,
                                    author: event.target.value,
                                });
                            }}
                            id="author"
                            type="text"
                            placeholder="Name"></input>
                    </div>
                </div>
            </form>
            <GifPicker setGifURL={setGifURL}></GifPicker>
            <button
                className={styles["submit-button"]}
                onClick={handleAddSubmit}>
                Add
            </button>
        </>
    );
};

export default AddCardForm;
