"use client"
import React, { useEffect } from "react";
import Patient from "./index";
import "./styles.scss";


function Page() {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <Patient />
    </div>
  );
}

export default Page;
