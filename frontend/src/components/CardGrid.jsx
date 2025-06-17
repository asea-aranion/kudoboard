import styles from "../css/CardGrid.module.css";
import Card from "./Card";

const CardGrid = ({ cards, upvoteCard }) => {
    return (
        <div className={styles["cards-grid"]}>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    upvoteCard={upvoteCard}></Card>
            ))}
        </div>
    );
};

export default CardGrid;
