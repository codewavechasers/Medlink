import React from "react";
import Layout from "./layout";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
function page() {
  return (
      <WithAuthRedirect>
        <Layout defaSelected="Dashboard"></Layout>
       </WithAuthRedirect>
  );
}

export default page;
