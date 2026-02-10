import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { AdminProjectStatusForm } from "@/components/admin/AdminProjectStatusForm";
import { AdminMessageForm } from "@/components/admin/AdminMessageForm";
import { AdminProjectFileUploadForm } from "@/components/admin/AdminProjectFileUploadForm";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { user: true, files: true, thread: { include: { messages: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl text-text">{project.title}</h3>
              <p className="text-xs text-muted">Client: {project.user.email ?? "N/A"}</p>
            </div>
            <AdminProjectStatusForm projectId={project.id} initialStatus={project.status} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm text-text">Upload files</h4>
              <AdminProjectFileUploadForm projectId={project.id} />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm text-text">Send message</h4>
              <AdminMessageForm projectId={project.id} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
