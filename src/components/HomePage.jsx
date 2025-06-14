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

    // placeholder data set on page load
    const cowGif =
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRoYnc0MWFjcWhmY2FzMmV6ODVoMzR1djkyeWNnN3VzbWo5cW1mNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QIma0G0GMja3LrGVYL/giphy.gif";
    const cowAlt = "Pixel art of a cartoon cow driving a motorcycle";

    useEffect(
        () =>
            setBoards([
                {
                    id: 0,
                    created: "2025-05-10",
                    title: "Teacher Appreciation",
                    category: "Thank you",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: null,
                    cards: [],
                },
                {
                    id: 1,
                    created: "2023-12-11",
                    title: "Motivation",
                    category: "Inspiration",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: "Ann",
                    cards: [],
                },
                {
                    id: 2,
                    created: "2024-08-20",
                    title: "Happy Birthday",
                    category: "Celebration",
                    imgSrc: cowGif,
                    imgAlt: cowAlt,
                    author: null,
                    cards: [],
                },
            ]),
        [],
    );

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
