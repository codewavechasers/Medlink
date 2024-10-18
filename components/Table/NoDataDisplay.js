"use client"

import React from "react";
import { InformationFilled } from "@carbon/icons-react";
import { Stack } from "@carbon/react";
import styles from "./NoDataDisplay.module.css";

const NoDataDisplay = () => {
  return (
    <Stack gap={5} className={styles.container}>
      <InformationFilled className={styles.icon} />
      <h2 className={styles.heading}>No Data Available</h2>
      <p className={styles.text}>
        There are no doctors notes to display at this time.
      </p>
    </Stack>
  );
};

export default NoDataDisplay;