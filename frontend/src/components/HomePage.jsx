import headerStyles from "../css/Header.module.css";
import footerStyles from "../css/Footer.module.css";
import BoardGrid from "./BoardGrid";
import FilterPicker from "./FilterPicker";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ColorSchemePicker from "./ColorSchemePicker";

const HomePage = () => {
    // current filter
    const [filterValue, setFilterValue] = useState("All");

    // user-entered search text
    const [searchTerm, setSearchTerm] = useState("");

    // array of data representing each board
    const [boards, setBoards] = useState(Array());

    // true if site is using dark css colors
    const [inDarkMode, setInDarkMode] = useState(
        document.documentElement.style.getPropertyValue("--tan-background") ===
            "rgb(80, 69, 46)",
    );

    // load boards from running server (connection to database)
    const loadBoards = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/boards`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `${response.status} ${response.statusText}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error fetching boards: ${error}`));
    };

    useEffect(loadBoards, []);

    return (
        <>
            <ColorSchemePicker
                inDarkMode={inDarkMode}
                setInDarkMode={setInDarkMode}></ColorSchemePicker>
            <header className={headerStyles["header"]}>
                <h1 className={headerStyles["title"]}>kudoboard</h1>
            </header>
            <main>
                <FilterPicker
                    filterValue={filterValue}
                    updateFilterValue={setFilterValue}></FilterPicker>
                <SearchBar updateSearchTerm={setSearchTerm}></SearchBar>
                <BoardGrid
                    filterValue={filterValue}
                    searchTerm={searchTerm}
                    boards={boards}
                    setBoards={setBoards}></BoardGrid>
            </main>
            <footer className={footerStyles["footer"]}>
                <p className={footerStyles["footer-text"]}>
                    Leia Spagnola 2025
                </p>
            </footer>
        </>
    );
};

export default HomePage;
