import React from "react";
export const metadata = {
  title: "Welcome to Medlink | Your Healthcare Companion",
  description: "Medlink is a trusted healthcare platform that connects patients to the best medical professionals. Book appointments, consult doctors, and manage your healthcare needs all in one place.",
};
import Welcome from "./index";

function page() {
  return (
    <>
      <Welcome />
    </>
  );
}

export default page;
