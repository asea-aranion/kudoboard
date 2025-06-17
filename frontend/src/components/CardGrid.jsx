import styles from "../css/CardGrid.module.css";
import Card from "./Card";

const CardGrid = ({cards}) => {

    return (
        <div className={styles["cards-grid"]}>
            {cards.map(card => <Card key={card.id} card={card}></Card>)}
        </div>
    )
}

export default CardGrid;