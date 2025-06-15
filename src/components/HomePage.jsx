import headerStyles from "../css/Header.module.css";
import footerStyles from "../css/Footer.module.css";
import BoardGrid from "./BoardGrid";
import FilterPicker from "./FilterPicker";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const HomePage = () => {
    // current filter
    const [filterValue, setFilterValue] = useState("All");

    // user-entered search text
    const [searchTerm, setSearchTerm] = useState("");

    // array of data representing each board
    const [boards, setBoards] = useState(Array());

    // load boards from running server (connection to database)
    const loadBoards = () => {
        fetch("http://localhost:3000/boards")
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error fetching boards: ${error}`));
    };

    useEffect(loadBoards, []);

    return (
        <>
            <header>
                <h1>kudoboard</h1>
            </header>
            <main>
                <FilterPicker
                    filterValue={filterValue}
                    updateFilterValue={setFilterValue}></FilterPicker>
                <SearchBar updateSearchTerm={setSearchTerm}></SearchBar>
                <BoardGrid
                    filterValue={filterValue}
                    searchTerm={searchTerm}
                    boards={boards}></BoardGrid>
            </main>
            <footer>
                <p>Leia Spagnola 2025</p>
            </footer>
        </>
    );
};

export default HomePage;
