import headerStyles from "../css/Header.module.css";
import footerStyles from "../css/Footer.module.css";
import BoardGrid from "./BoardGrid";
import FilterPicker from "./FilterPicker";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";

const HomePage = () => {
    // current filter
    const [filterValue, setFilterValue] = useState("All");

    // user-entered search text
    const [searchTerm, setSearchTerm] = useState("");

    // array of data representing each board
    const [boards, setBoards] = useState(Array());

    const [modalMode, setModalMode] = useState("add-board");

    // load boards from running server (connection to database)
    const loadBoards = () => {
        fetch("http://localhost:3000/boards")
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error fetching boards: ${error}`));
    };

    const showModal = (newMode) => {
        setModalMode(newMode);
        document.querySelector("#overlay").style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
    };

    const hideModal = () => {
        document.querySelector("#overlay").style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
    };

    // add a board and reload boards
    const addBoard = (formInput) => {
        fetch("http://localhost:3000/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                created: new Date(),
                title: formInput.title,
                author: formInput.author === "" ? null : formInput.author,
                category: formInput.category,
                imgSrc: formInput.imgSrc,
                imgAlt: formInput.imgAlt,
            }),
        })
            .then((response) => response.json())
            .then((json) => setBoards(json))
            .catch((error) => console.error(`Error adding board: ${error}`));
    };

    useEffect(loadBoards, []);

    return (
        <>
            <Modal
                mode={modalMode}
                hideModal={hideModal}
                addBoard={addBoard}></Modal>
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
                    boards={boards}
                    setBoards={setBoards}
                    showModal={showModal}></BoardGrid>
            </main>
            <footer>
                <p>Leia Spagnola 2025</p>
            </footer>
        </>
    );
};

export default HomePage;
