import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

export default function ExportPage() {
  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Export my data</h2>
      <p className="text-sm text-muted">Download a JSON export of your projects, files, and messages.</p>
      <ButtonLink href="/api/export/me" variant="outline">
        Download Export
      </ButtonLink>
    </Card>
  );
}
