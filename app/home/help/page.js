"use client";

import React from "react";
import Help from "./index";
import Layout from "../layout";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";

function page() {
  return (
    <WithAuthRedirect>
    <div>
      <Layout defaultSelected={'Help'}>
        <Help />
      </Layout>
    </div>
    </WithAuthRedirect>
  );
}

export default page;
