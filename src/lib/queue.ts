import { processOutbox } from "./email";

export async function runEmailOutboxJob(): Promise<{ sent: number; failed: number }> {
  return processOutbox(25);
}
