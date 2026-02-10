import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { ContentBlockForm } from "@/components/admin/ContentBlockForm";

export default async function AdminContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { key: "asc" }
  });

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <Card key={block.id} className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{block.key}</p>
          <ContentBlockForm blockId={block.id} initialTitle={block.title} initialBody={block.body} />
        </Card>
      ))}
    </div>
  );
}
