import headerStyles from "../css/Header.module.css";
import footerStyles from "../css/Footer.module.css";
import BoardGrid from "./BoardGrid";

const HomePage = () => {
    return (
        <>
            <header>
                <h1>kudoboard</h1>
            </header>
            <main>
                <BoardGrid></BoardGrid>
            </main>
            <footer>
                <p>Leia Spagnola 2025</p>
            </footer>
        </>
    );
};

export default HomePage;
