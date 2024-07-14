import { LoginForm } from "@/components/forms/auth/LoginForm";
import { ChevronLeft } from "@carbon/icons-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* topnav */}
      <div className="flex h-24 w-full py-1.5 px-2.5 justify-between items-center">
        <span className="flex h-full w-fit items-center gap-x-2.5">
          <ChevronLeft />
          back
        </span>
        <Link href={"#"} className="flex h-full w-fit items-center">
          Already have an account ? <strong>Sign In</strong>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
