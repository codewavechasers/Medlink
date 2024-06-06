"use client";
import { Button } from "@carbon/react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <h2>hello</h2>
      <Link href="/home">
        <Button kind="primary">Go to dashboard</Button>
      </Link>
    </>
  );
}
