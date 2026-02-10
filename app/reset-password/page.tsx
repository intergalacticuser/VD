import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams
}: {
  searchParams?: { token?: string };
}) {
  const token = searchParams?.token ?? "";

  return (
    <Container className="space-y-10 pb-24 pt-16">
      <PageHeader
        eyebrow="Reset"
        title="Set a new password"
        description="Enter your new password to regain access."
      />
      <Card className="max-w-xl">
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="text-sm text-muted">Missing reset token.</p>
        )}
      </Card>
    </Container>
  );
}
