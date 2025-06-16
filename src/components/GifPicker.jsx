import { useRef, useState } from "react";
import styles from "../css/GifPicker.module.css";

const GifPicker = ({ setGifURL }) => {
    const inputRef = useRef(null);

    const [gifData, setGifData] = useState(Array());

    const [selectedId, setSelectedId] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();

        const searchTerm = inputRef.current.value;

        fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchTerm}`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status + response.statusText);
                } else {
                    return response.json();
                }
            })
            .then((json) =>
                json.data.map((gif) => {
                    return {
                        id: gif.id,
                        embed: gif.embed_url,
                        alt: gif.alt_text,
                    };
                }),
            )
            .then((data) => {
                setGifData(data);
            })
            .catch((error) =>
                console.error(`Error fetching GIPHY results: ${error}`),
            );
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["search-bar"]}>
                <p>Search for a GIF</p>
                <div className={styles["input-container"]}>
                    <input
                        type="text"
                        ref={inputRef}></input>
                </div>
                <button
                    className={styles["search-button"]}
                    onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className={styles["gifs-container"]}>
                {gifData.map((gif) => {
                    return (
                        <div
                            className={styles["iframe-container"]}
                            onClick={() => {
                                setGifURL(gif.embed, gif.alt);
                                setSelectedId(gif.id);
                            }}
                            key={gif.id}>
                            <iframe
                                src={gif.embed}
                                alt={gif.alt}></iframe>
                            <div
                                className={`${styles["iframe-cover"]} ${selectedId === gif.id ? styles["selected-cover"] : ""}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GifPicker;
