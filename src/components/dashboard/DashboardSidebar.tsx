import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/files", label: "Files" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/export", label: "Export" }
] as const;

export function DashboardSidebar() {
  return (
    <aside className="space-y-4">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Dashboard</p>
      <nav className="flex flex-col gap-2 text-sm text-muted">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 hover:bg-bgSoft hover:text-text">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
