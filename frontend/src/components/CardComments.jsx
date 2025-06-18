import styles from "../css/CardComments.module.css";
import { useEffect, useState } from "react";

const CardComments = ({ cardId }) => {
    const [comments, setComments] = useState(Array());

    const [newComment, setNewComment] = useState({
        text: "",
        author: null,
    });

    // add comment with entered data
    const addComment = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/comments/card/${cardId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                cardId: cardId,
                text: newComment.text,
                author: newComment.author === "" ? null : newComment.author,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status} ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => setComments(json))
            .catch((error) => console.error(`Error adding comment: ${error}`));
    };

    // load all comments associated with this card
    const fetchComments = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/comments/card/${cardId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status} ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => setComments(json))
            .catch((error) =>
                console.error(`Error fetching comments: ${error}`),
            );
    };

    useEffect(fetchComments, []);

    return (
        <div className={styles["container"]}>
            <div className={styles["comments-container"]}>
                {comments.map((comment) => (
                    <div className={styles["comment"]}>
                        <p className={styles["comment-text"]}>{comment.text}</p>
                        <p className={styles["comment-text"]}>
                            - {comment.author ?? "Anonymous"}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles["add-form-container"]}>
                <div
                    className={
                        styles["label-container"] + " " + styles["text-input"]
                    }>
                    <label
                        htmlFor="text"
                        className={styles["label"]}>
                        Text
                    </label>
                    <div className={styles["input-container"]}>
                        <input
                            className={styles["input"]}
                            onChange={(event) => {
                                setNewComment({
                                    ...newComment,
                                    text: event.target.value,
                                });
                            }}
                            id="text"
                            type="text"
                            placeholder="New comment"
                            required></input>
                    </div>
                </div>
                <div
                    className={
                        styles["label-container"] + " " + styles["author-input"]
                    }>
                    <label
                        htmlFor="author"
                        className={styles["label"]}>
                        Author
                    </label>
                    <div className={styles["input-container"]}>
                        <input
                            className={styles["input"]}
                            onChange={(event) => {
                                setNewComment({
                                    ...newComment,
                                    author: event.target.value,
                                });
                            }}
                            id="author"
                            type="text"
                            placeholder="Name"></input>
                    </div>
                </div>
                <button
                    className={styles["add-comment-button"]}
                    onClick={addComment}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default CardComments;
