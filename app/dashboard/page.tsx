import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const [projects, files, notifications] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.file.count({ where: { project: { userId } } }),
    prisma.notification.count({ where: { userId, readAt: null } })
  ]);

  const recentProjects = await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Projects</p>
          <p className="mt-3 text-3xl text-text">{projects}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Files</p>
          <p className="mt-3 text-3xl text-text">{files}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Unread Notifications</p>
          <p className="mt-3 text-3xl text-text">{notifications}</p>
        </Card>
      </div>

      <Card className="space-y-4">
        <h2 className="text-2xl text-text">Recent projects</h2>
        {recentProjects.length === 0 ? (
          <EmptyState title="No projects yet" description="Create your first project to get started." />
        ) : (
          <div className="space-y-3 text-sm text-muted">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <span className="text-text">{project.title}</span>
                <span>{project.status}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
