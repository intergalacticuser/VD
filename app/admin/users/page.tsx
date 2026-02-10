import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { AdminUserUpdateForm } from "@/components/admin/AdminUserUpdateForm";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="rounded-xl border border-line bg-bgSoft p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-text">{user.name ?? "Unnamed"}</p>
                <p className="text-xs text-muted">{user.email ?? "No email"}</p>
              </div>
              <AdminUserUpdateForm
                userId={user.id}
                initialRole={user.role}
                initialDisabled={user.isDisabled}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
