import styles from "../css/ModalAddForm.module.css";
import { useState } from "react";
import GifPicker from "./GifPicker";

const AddBoardForm = ({ addBoard, setMode, setShowingAlert }) => {
    // data entered in form
    const [addBoardData, setAddBoardData] = useState({
        title: "",
        category: "Thank you",
        author: null,
        imgSrc: "",
        imgAlt: "",
    });

    // set gif information in addBoardData
    const setGifURL = (imgSrc, imgAlt) => {
        setAddBoardData({
            ...addBoardData,
            imgSrc: imgSrc,
            imgAlt: imgAlt,
        });
    };

    // calculate horizontal position of dark green slider in category picker based on filter value
    const getCategorySliderOffset = () => {
        switch (addBoardData.category) {
            case "Thank you":
                return "0";
            case "Inspiration":
                return "100%";
            case "Celebration":
                return "200%";
        }
    };

    // add board and hide modal containing this form
    const handleAddSubmit = (event) => {
        event.preventDefault();

        if (!addBoardData.title || !addBoardData.category || !addBoardData.imgSrc) {
            setShowingAlert(true);
        } else {
            setShowingAlert(false);
            addBoard(addBoardData);

            setMode("hidden");
        }
    };

    return (
        <>
            <form className={styles["form"]}>
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
                    <div className={styles["category-picker-container"]}>
                        <div className={styles["category-slider"]} style={{transform: `translateX(${getCategorySliderOffset()})`}}>
                        </div> 
                            <div className={styles["category-options-container"]}>
                                <p onClick={() => setAddBoardData({
                                    ...addBoardData,
                                    category: "Thank you"
                                })}>Thank you</p>
                                <p onClick={() => setAddBoardData({
                                    ...addBoardData,
                                    category: "Inspiration"
                                })}>Inspiration</p>
                                <p onClick={() => setAddBoardData({
                                    ...addBoardData,
                                    category: "Celebration"
                                })}>Celebration</p>
                            </div>
                        
                    </div>
                </div>
                <div className={styles["label-container"]}>
                    <label htmlFor="author">Author (optional)</label>
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
        </>
    );
};

export default AddBoardForm;
