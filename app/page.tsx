"use client";
import { Button, Heading, Tooltip } from "@carbon/react";
import Link from "next/link";
import { Add, Information } from "@carbon/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px"}}>
      <Link href="./onboarding/welcome-to-medlink">
        <Button renderIcon={Add} iconDescription="Go to home">
          Get started
        </Button>
      </Link>
      <div>
      <Link href="./home">
        <Button renderIcon={Add} iconDescription="Go to home">
          Go to dashboard
        </Button>
      </Link>
      </div>
      <Heading>Please note that the landing pages and auth pages are not fully developed.</Heading>
    </div>
  );
}
