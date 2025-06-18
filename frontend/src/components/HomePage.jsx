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

    const [inDarkMode, setInDarkMode] = useState(false);

    // load boards from running server (connection to database)
    const loadBoards = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/boards`)
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error fetching boards: ${error}`));
    };

    const toggleColorScheme = () => {
        if (inDarkMode) {
            document.documentElement.style.setProperty("--tan-background", "rgb(232, 215, 172)")
            document.documentElement.style.setProperty("--tan-accent", "rgb(176, 143, 60)")
            document.documentElement.style.setProperty("--green-background", "rgb(198, 231, 192)")
            document.documentElement.style.setProperty("--green-accent", "rgb(162, 213, 149)")
            document.documentElement.style.setProperty("--page-background", "rgb(251, 251, 248")
            document.documentElement.style.setProperty("--text", "rgb(23, 21, 14)")
            setInDarkMode(false);

        } else {
            document.documentElement.style.setProperty("--tan-background", "rgb(80, 69, 46)")
            document.documentElement.style.setProperty("--tan-accent", "rgb(174, 147, 79)")
            document.documentElement.style.setProperty("--green-background", "rgb(59, 77, 56)")
            document.documentElement.style.setProperty("--green-accent", "rgb(72, 116, 61)")
            document.documentElement.style.setProperty("--page-background", "rgb(38, 32, 8)")
            document.documentElement.style.setProperty("--text", "rgb(251, 251, 248)")
            setInDarkMode(true);
        }
        
    }

    useEffect(loadBoards, []);

    return (
        <>
            <ColorSchemePicker inDarkMode={inDarkMode} setInDarkMode={toggleColorScheme}></ColorSchemePicker>
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
                <p className={footerStyles["footer-text"]}>Leia Spagnola 2025</p>
            </footer>
        </>
    );
};

export default HomePage;
