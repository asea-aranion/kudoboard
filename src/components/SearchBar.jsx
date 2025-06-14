import styles from "../css/SearchBar.module.css"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useRef } from "react";

const SearchBar = ({ updateSearchTerm }) => {

    // reference to text input in search bar
    const inputRef = useRef(null);

    // clears input and resets search
    const handleClear = () => {
        inputRef.current.value = "";
        updateSearchTerm("");
    }

    // updates parent's searchTerm value
    const handleSearch = () => {
        updateSearchTerm(inputRef.current.value);
    }

    // updates parent's searchTerm value when Enter is pressed in text input
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className={styles["search-bar"]}>
            <div className={styles["search-input-container"]}>
                <input type="text" ref={inputRef} onKeyDown={handleKeyDown} className={styles["search-input"]}></input>
                <ClearRoundedIcon onClick={handleClear} className={styles["search-icon"]}></ClearRoundedIcon>
            </div>
            <SearchRoundedIcon onClick={handleSearch} className={styles["search-icon"]}></SearchRoundedIcon>
        </div>
    )
};

export default SearchBar;
