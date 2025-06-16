import { useRef, useState } from "react";
import styles from "../css/Modal.module.css";

const Modal = ({ mode, hideModal, addBoard }) => {
    const overlayRef = useRef(null);

    const [addBoardData, setAddBoardData] = useState({
        title: "",
        category: "",
        author: null,
    });

    // hide overlay and modal if overlay itself is clicked
    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            hideModal();
        }
    };

    // add new board with user-entered data and hide modal
    const handleAddSubmit = (event) => {
        event.preventDefault();

        addBoard(addBoardData);

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
                            <button
                                type="submit"
                                onClick={handleAddSubmit}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            );
    }
};

export default Modal;
