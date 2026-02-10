import { NextResponse } from "next/server";
import { runEmailOutboxJob } from "@/lib/queue";

export async function POST() {
  const result = await runEmailOutboxJob();
  return NextResponse.json(result);
}
