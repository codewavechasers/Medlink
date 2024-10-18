import React from "react";
import Layout from "./layout";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
export const metadata = {
  title: "Home | Medlink",
  description: "Welcome back to Medlink! Manage your health, book appointments, and consult with healthcare professionals seamlessly.",
};
function page() {
  return (
      <WithAuthRedirect>
        <Layout ></Layout>
       </WithAuthRedirect>
  );
}

export default page;
