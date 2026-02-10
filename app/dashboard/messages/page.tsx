import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function MessagesPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const threads = await prisma.messageThread.findMany({
    where: { project: { userId } },
    include: { project: true, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Messages</h2>
      {threads.length === 0 ? (
        <EmptyState title="No messages yet" description="Messages will appear when you or an admin send one." />
      ) : (
        <div className="space-y-3 text-sm text-muted">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/dashboard/projects/${thread.projectId}`}
              className="flex items-center justify-between rounded-xl border border-line px-4 py-3 hover:bg-bgSoft"
            >
              <span className="text-text">{thread.project.title}</span>
              <span>{thread.messages[0]?.body?.slice(0, 40) ?? "No messages"}</span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
