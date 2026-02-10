import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export default async function AdminLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Audit logs</h2>
      <div className="space-y-2 text-sm text-muted">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between">
            <span className="text-text">{log.action}</span>
            <span>{log.entityType}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
