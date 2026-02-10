import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <Container className="grid gap-8 pb-24 pt-10 lg:grid-cols-[260px,1fr]">
      <DashboardSidebar />
      <section className="space-y-8">{children}</section>
    </Container>
  );
}

export const dynamic = "force-dynamic";
