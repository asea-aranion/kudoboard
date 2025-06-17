import { useRef, useState } from "react";
import styles from "../css/Modal.module.css";
import GifPicker from "./GifPicker";

const Modal = ({ mode, hideModal, addBoard, addCard }) => {
    const overlayRef = useRef(null);

    // data entered in add board form
    const [addBoardData, setAddBoardData] = useState({
        title: "",
        category: "Thank you",
        author: null,
        imgSrc: "",
        imgAlt: "",
    });

    // data entered in add card form
    const [addCardData, setAddCardData] = useState({
        message: "",
        author: null,
        imgSrc: "",
        imgAlt: "",
    });

    // update form data with selected url and alt text from GifPicker
    const setGifURL = (imgSrc, imgAlt) => {
        switch (mode) {
            case "add-board":
                setAddBoardData({
                    ...addBoardData,
                    imgSrc: imgSrc,
                    imgAlt: imgAlt,
                });
            case "add-card":
                setAddCardData({
                    ...addCardData,
                    imgSrc: imgSrc,
                    imgAlt: imgAlt,
                });
        }
    };

    // hide overlay and modal if overlay itself is clicked
    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            hideModal();
        }
    };

    // add new board with user-entered data and hide modal
    const handleAddSubmit = (event) => {
        event.preventDefault();

        if (addBoard) {
            addBoard(addBoardData);
        } else if (addCard) {
            addCard(addCardData);
        }

        hideModal();
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
                        <h2>add board</h2>
                        <form>
                            <div className={styles["label-container"]}>
                                <label htmlFor="title">Title</label>
                                <div className={styles["input-container"]}>
                                    <input
                                        onChange={(event) =>
                                            setAddBoardData({
                                                ...addBoardData,
                                                title: event.target.value,
                                            })
                                        }
                                        id="title"
                                        type="text"
                                        placeholder="New board"
                                        required={true}></input>
                                </div>
                            </div>
                            <div className={styles["label-container"]}>
                                <label htmlFor="category">Category</label>
                                <div className={styles["input-container"]}>
                                    <select
                                        onChange={(event) =>
                                            setAddBoardData({
                                                ...addBoardData,
                                                category: event.target.value,
                                            })
                                        }
                                        id="category"
                                        required={true}>
                                        <option value="Thank you">
                                            Thank you
                                        </option>
                                        <option value="Inspiration">
                                            Inspiration
                                        </option>
                                        <option value="Celebration">
                                            Celebration
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles["label-container"]}>
                                <label htmlFor="author">
                                    Author (optional)
                                </label>
                                <div className={styles["input-container"]}>
                                    <input
                                        onChange={(event) =>
                                            setAddBoardData({
                                                ...addBoardData,
                                                author: event.target.value,
                                            })
                                        }
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
                        <h2>add card</h2>
                        <form>
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
                                <label htmlFor="author">
                                    Author (optional)
                                </label>
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
                    </div>
                </div>
            );
    }
};

export default Modal;
