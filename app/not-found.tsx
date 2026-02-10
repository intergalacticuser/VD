import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="space-y-6 pb-24 pt-24 text-center">
      <h1 className="font-display text-4xl text-text">Page not found</h1>
      <p className="text-sm text-muted">The page you requested does not exist.</p>
      <div className="flex justify-center">
        <ButtonLink href="/">Return home</ButtonLink>
      </div>
    </Container>
  );
}
