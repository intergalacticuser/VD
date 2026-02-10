import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db";

async function main() {
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL ?? "admin@vdpublishing.com";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminName = process.env.INITIAL_ADMIN_NAME ?? "VD Admin";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        passwordHash,
        role: "ADMIN"
      }
    });
  }

  const contentBlocks = [
    {
      key: "HOME_HERO",
      title: "VD Publishing",
      body: "VD Publishing is an independent editorial and publishing studio providing end-to-end publishing services — from editorial work and design to ISBN assignment and global distribution."
    },
    {
      key: "ABOUT_TEXT",
      title: "About",
      body: "We partner with authors who care about craft, helping deliver premium publishing outcomes with transparent collaboration."
    },
    {
      key: "HOW_IT_WORKS",
      title: "How It Works",
      body: "Submit your manuscript, receive a tailored plan, and collaborate with our editorial, design, and distribution specialists."
    }
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: { title: block.title, body: block.body },
      create: block
    });
  }
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
