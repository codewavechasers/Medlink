import React from "react";
import { InformationFilled } from "@carbon/icons-react";
import styles from "./NoDataDisplay.module.css";

const NoDataDisplay = () => {
  return (
    <div className={styles.container}>
      <InformationFilled className={styles.icon} />
      <h2 className={styles.heading}>No Appointments Available</h2>
      <p className={styles.text}>
        There are no Booked appointments to display at this time.
      </p>
    </div>
  );
};

export default NoDataDisplay;