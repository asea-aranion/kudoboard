import styles from "../css/FilterPicker.module.css";

const FilterPicker = ({ filterValue, updateFilterValue }) => {
    // calculate horizontal position of dark green slider based on filter value
    const getSliderOffset = () => {
        switch (filterValue) {
            case "All":
                return "0";
            case "Recent":
                return "100%";
            case "Thank you":
                return "200%";
            case "Inspiration":
                return "300%";
            case "Celebration":
                return "400%";
        }
    };

    return (
        <div className={styles["picker-container"]}>
            <div
                className={styles["slider"]}
                style={{ transform: `translateX(${getSliderOffset()})` }}></div>
            <div className={styles["picker-options-container"]}>
                <p onClick={() => updateFilterValue("All")}>All</p>
                <p onClick={() => updateFilterValue("Recent")}>Recent</p>
                <p onClick={() => updateFilterValue("Thank you")}>Thank you</p>
                <p onClick={() => updateFilterValue("Inspiration")}>
                    Inspiration
                </p>
                <p onClick={() => updateFilterValue("Celebration")}>
                    Celebration
                </p>
            </div>
        </div>
    );
};

export default FilterPicker;
