import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { CreateProjectForm } from "@/components/forms/CreateProjectForm";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function ProjectsPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h2 className="text-2xl text-text">Create a project</h2>
        <CreateProjectForm />
      </Card>

      <Card className="space-y-4">
        <h2 className="text-2xl text-text">My projects</h2>
        {projects.length === 0 ? (
          <EmptyState title="No projects" description="Create a project to start collaborating." />
        ) : (
          <div className="space-y-3 text-sm text-muted">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-between rounded-xl border border-line px-4 py-3 hover:bg-bgSoft"
              >
                <span className="text-text">{project.title}</span>
                <span>{project.status}</span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
