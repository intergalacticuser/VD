import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/logs", label: "Audit Logs" }
];

export function AdminSidebar() {
  return (
    <aside className="space-y-4">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
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
