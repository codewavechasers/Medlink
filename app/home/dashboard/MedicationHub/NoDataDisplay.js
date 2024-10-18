import React from "react";
import { InformationFilled } from "@carbon/icons-react";
import styles from "./NoDataDisplay.module.css";

const NoDataDisplay = ({title, text}) => {
  return (
    <div className={styles.container}>
      <InformationFilled className={styles.icon} />
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.text}>
       {text}
      </p>
    </div>
  );
};

export default NoDataDisplay;