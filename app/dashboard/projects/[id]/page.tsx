import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { ProjectMessageForm } from "@/components/forms/ProjectMessageForm";
import { ProjectFileUploadForm } from "@/components/forms/ProjectFileUploadForm";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const project = await prisma.project.findFirst({
    where: { id, userId },
    include: {
      files: { orderBy: { createdAt: "desc" } },
      thread: { include: { messages: { orderBy: { createdAt: "asc" } } } }
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <h2 className="text-2xl text-text">{project.title}</h2>
        <p className="text-sm text-muted">Status: {project.status}</p>
        {project.description ? <p className="text-sm text-muted">{project.description}</p> : null}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-xl text-text">Files</h3>
        <ProjectFileUploadForm projectId={project.id} />
        {project.files.length === 0 ? (
          <EmptyState title="No files yet" description="Upload your manuscript to start the review." />
        ) : (
          <div className="space-y-2 text-sm text-muted">
            {project.files.map((file) => (
              <div key={file.id} className="flex items-center justify-between">
                <span className="text-text">{file.originalName}</span>
                <span>{Math.round(Number(file.sizeBytes) / 1024)} KB</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-xl text-text">Messages</h3>
        {project.thread?.messages?.length ? (
          <div className="space-y-3">
            {project.thread.messages.map((message) => (
              <div key={message.id} className="rounded-xl border border-line bg-bgSoft p-3 text-sm text-muted">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{message.senderRole}</p>
                <p className="mt-2 text-text">{message.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No messages yet" description="Send a message to start the conversation." />
        )}
        <ProjectMessageForm projectId={project.id} />
      </Card>
    </div>
  );
}
