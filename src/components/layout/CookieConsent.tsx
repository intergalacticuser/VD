"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function CookieConsent() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2">
      <Card className="space-y-3">
        <p className="text-sm text-text">We use cookies to improve the site experience.</p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
          <Button onClick={() => setVisible(false)}>Accept</Button>
        </div>
      </Card>
    </div>
  );
}
