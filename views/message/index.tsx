import { Separator } from "@/components/ui/separator";
import React from "react";

export default function MessagePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Message</h1>
          <p className="text-sm text-zinc-500">
            Read, send, and organize your messages and communication history.
          </p>
        </div>
        <Separator />
      </div>
    </div>
  );
}
