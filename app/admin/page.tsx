import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export default async function AdminOverviewPage() {
  const [users, projects, inquiries, files] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.inquiry.count(),
    prisma.file.count()
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Users</p>
        <p className="mt-3 text-3xl text-text">{users}</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Projects</p>
        <p className="mt-3 text-3xl text-text">{projects}</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Inquiries</p>
        <p className="mt-3 text-3xl text-text">{inquiries}</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Files</p>
        <p className="mt-3 text-3xl text-text">{files}</p>
      </Card>
    </div>
  );
}
