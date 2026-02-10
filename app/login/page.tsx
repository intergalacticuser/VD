import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoginForm } from "@/components/forms/LoginForm";
import { ButtonLink } from "@/components/ui/Button";
import { OAuthButtons } from "@/components/forms/OAuthButtons";

export default function LoginPage() {
  return (
    <Container className="space-y-10 pb-24 pt-16">
      <PageHeader
        eyebrow="Access"
        title="Welcome back"
        description="Sign in to manage projects, files, and messages."
      />
      <Card className="max-w-xl">
        <LoginForm />
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Or continue with</p>
          <OAuthButtons />
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          <ButtonLink href="/forgot-password" variant="ghost">
            Forgot password
          </ButtonLink>
          <ButtonLink href="/register" variant="ghost">
            Create account
          </ButtonLink>
        </div>
      </Card>
    </Container>
  );
}
