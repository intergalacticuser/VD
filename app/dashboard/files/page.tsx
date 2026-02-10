import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function FilesPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const files = await prisma.file.findMany({
    where: { project: { userId } },
    include: { project: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Files</h2>
      {files.length === 0 ? (
        <EmptyState title="No files yet" description="Upload a file inside a project." />
      ) : (
        <div className="space-y-2 text-sm text-muted">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <div>
                <p className="text-text">{file.originalName}</p>
                <p className="text-xs text-muted">Project: {file.project.title}</p>
              </div>
              <span>{Math.round(Number(file.sizeBytes) / 1024)} KB</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
