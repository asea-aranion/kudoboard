import styles from "../css/CardGrid.module.css";
import Card from "./Card";

const CardGrid = ({ cards, upvoteCard, deleteCard, pinCard }) => {
    const sortByPinned = (a, b) => {
        // if neither are pinned, maintain order
        if (!a.pinDate && !b.pinDate) {
            return 0;
            // if only a is pinned, a comes first
        } else if (a.pinDate && !b.pinDate) {
            return -1;

            // if only b is pinned, b comes first
        } else if (!a.pinDate && b.pinDate) {
            return 1;

            // if a and b are pinned, most recent comes first
        } else {
            return new Date(b.pinDate) - new Date(a.pinDate);
        }
    };

    return (
        <div className={styles["cards-grid"]}>
            {cards.sort(sortByPinned).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    upvoteCard={upvoteCard}
                    deleteCard={deleteCard}
                    pinCard={pinCard}></Card>
            ))}
        </div>
    );
};

export default CardGrid;
