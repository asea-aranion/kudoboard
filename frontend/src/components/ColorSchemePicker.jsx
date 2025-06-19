import styles from "../css/ColorSchemePicker.module.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ColorSchemePicker = ({ inDarkMode, setInDarkMode }) => {

    // get horizontal offset to align slider with correct icon
    const getSliderOffset = () => {
        if (inDarkMode) {
            return "5rem";
        } else {
            return "0";
        }
    };

    // switch css colors to opposite of current light/dark mode state
    const toggleColorScheme = () => {
        if (inDarkMode) {
            document.documentElement.style.setProperty(
                "--tan-background",
                "rgb(232, 215, 172)",
            );
            document.documentElement.style.setProperty(
                "--tan-accent",
                "rgb(176, 143, 60)",
            );
            document.documentElement.style.setProperty(
                "--green-background",
                "rgb(198, 231, 192)",
            );
            document.documentElement.style.setProperty(
                "--green-accent",
                "rgb(162, 213, 149)",
            );
            document.documentElement.style.setProperty(
                "--page-background",
                "rgb(251, 251, 248",
            );
            document.documentElement.style.setProperty(
                "--text",
                "rgb(23, 21, 14)",
            );
            setInDarkMode(false);
        } else {
            document.documentElement.style.setProperty(
                "--tan-background",
                "rgb(80, 69, 46)",
            );
            document.documentElement.style.setProperty(
                "--tan-accent",
                "rgb(174, 147, 79)",
            );
            document.documentElement.style.setProperty(
                "--green-background",
                "rgb(59, 77, 56)",
            );
            document.documentElement.style.setProperty(
                "--green-accent",
                "rgb(72, 116, 61)",
            );
            document.documentElement.style.setProperty(
                "--page-background",
                "rgb(38, 32, 8)",
            );
            document.documentElement.style.setProperty(
                "--text",
                "rgb(251, 251, 248)",
            );
            setInDarkMode(true);
        }
    };

    return (
        <div className={styles["picker-container"]}>
            <div
                className={styles["slider"]}
                style={{ transform: `translateX(${getSliderOffset()})` }}></div>
            <div className={styles["picker-options-container"]}>
                <LightModeRoundedIcon
                    onClick={toggleColorScheme}></LightModeRoundedIcon>
                <DarkModeRoundedIcon
                    onClick={toggleColorScheme}></DarkModeRoundedIcon>
            </div>
        </div>
    );
};

export default ColorSchemePicker;
