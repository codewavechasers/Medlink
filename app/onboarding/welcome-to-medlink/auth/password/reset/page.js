import React, {Suspense} from "react";
import Reset from "./reset";
import { Loading } from "@carbon/react";
export const metadata = {
  title: "Reset Password | Medlink",
  description:
    "Reset your Medlink password to regain access to your account securely.",
};
function ResetPage() {
  return (
      <div>
      <Reset />
    </div>
    
  );
}

export default ResetPage;
