"use client";
import { Button, Tooltip } from "@carbon/react";
import Link from "next/link";
import { Add, Information } from "@carbon/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px", background:"black" }}>
      <Link href="/home">
        <Button renderIcon={Add} iconDescription="Go to home">
          Go to home
        </Button>
      </Link>
      <div>
        <Tooltip label="Label one" enterDelayMs={0} leaveDelayMs={300}>
          <Information />
        </Tooltip>
      </div>
    </div>
  );
}
