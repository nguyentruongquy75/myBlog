import React, { useContext, useEffect } from "react";

import themeContext from "../../context/themeContext";

import SunImage from "../../assets/img/sun.png";
import MoonImage from "../../assets/img/moon.png";

import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  const context = useContext(themeContext);

  const switchTheme = () =>
    context.setTheme((theme) => {
      if (theme === "light") {
        return "dark";
      } else if (theme === "dark") {
        return "light";
      }
    });

  // switch css
  useEffect(() => {
    document.body.className = context.theme;
  }, [context.theme]);

  return (
    <div className={styles["container"]}>
      {context.theme === "dark" && (
        <div onClick={switchTheme} className={`${styles.button}`}>
          <img src={SunImage} alt="Sun Icon" />
        </div>
      )}
      {context.theme === "light" && (
        <div onClick={switchTheme} className={`${styles.button}`}>
          <img src={MoonImage} alt="Moon Icon" />
        </div>
      )}
    </div>
  );
}
