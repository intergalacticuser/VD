import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { PasswordForm } from "@/components/forms/PasswordForm";
import { DeleteAccountForm } from "@/components/forms/DeleteAccountForm";

export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h2 className="text-2xl text-text">Profile</h2>
        <ProfileForm initialName={user?.name ?? null} initialPhone={user?.phone ?? null} />
      </Card>
      <Card className="space-y-4">
        <h2 className="text-2xl text-text">Password</h2>
        <PasswordForm />
      </Card>
      <Card className="space-y-4">
        <h2 className="text-2xl text-text">Delete account</h2>
        <DeleteAccountForm />
      </Card>
    </div>
  );
}
