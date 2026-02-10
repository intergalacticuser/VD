"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function OAuthButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => signIn("google")}>Continue with Google</Button>
      <Button variant="outline" onClick={() => signIn("apple")}>Continue with Apple</Button>
    </div>
  );
}
