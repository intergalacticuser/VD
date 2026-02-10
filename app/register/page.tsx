import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { ButtonLink } from "@/components/ui/Button";
import { OAuthButtons } from "@/components/forms/OAuthButtons";

export default function RegisterPage() {
  return (
    <Container className="space-y-10 pb-24 pt-16">
      <PageHeader
        eyebrow="Join"
        title="Create your account"
        description="Track submissions, files, and project milestones in one dashboard."
      />
      <Card className="max-w-xl">
        <RegisterForm />
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Or continue with</p>
          <OAuthButtons />
        </div>
        <div className="mt-4 text-sm text-muted">
          <ButtonLink href="/login" variant="ghost">
            Already have an account? Sign in
          </ButtonLink>
        </div>
      </Card>
    </Container>
  );
}
