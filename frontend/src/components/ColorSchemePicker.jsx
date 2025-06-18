import styles from "../css/ColorSchemePicker.module.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ColorSchemePicker = ({ inDarkMode, setInDarkMode }) => {
    const getSliderOffset = () => {
        if (inDarkMode) {
            return "5rem";
        } else {
            return "0";
        }
    };

    return (
        <div className={styles["picker-container"]}>
            <div
                className={styles["slider"]}
                style={{ transform: `translateX(${getSliderOffset()})` }}></div>
            <div className={styles["picker-options-container"]}>
                <LightModeRoundedIcon
                    onClick={() => setInDarkMode(false)}></LightModeRoundedIcon>
                <DarkModeRoundedIcon
                    onClick={() => setInDarkMode(true)}></DarkModeRoundedIcon>
            </div>
        </div>
    );
};

export default ColorSchemePicker;
