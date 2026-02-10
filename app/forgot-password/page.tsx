import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Container className="space-y-10 pb-24 pt-16">
      <PageHeader
        eyebrow="Reset"
        title="Forgot your password?"
        description="We will email a secure reset link if the account exists."
      />
      <Card className="max-w-xl">
        <ForgotPasswordForm />
      </Card>
    </Container>
  );
}
