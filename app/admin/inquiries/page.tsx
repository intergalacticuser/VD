import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { AdminInquiryStatusForm } from "@/components/admin/AdminInquiryStatusForm";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl text-text">Inquiries</h2>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-xl border border-line bg-bgSoft p-4">
            <div className="space-y-2">
              <p className="text-sm text-text">{inquiry.subject}</p>
              <p className="text-xs text-muted">
                {inquiry.name} · {inquiry.email}
              </p>
              <p className="text-sm text-muted">{inquiry.message}</p>
            </div>
            <div className="mt-3">
              <AdminInquiryStatusForm inquiryId={inquiry.id} initialStatus={inquiry.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
