export const BRAND = "VD Publishing";
export const TAGLINE = "From Manuscript to Book";
export const PUBLIC_PHONE = "+1 260-230-8885";

export const ALLOWED_UPLOAD_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "pages",
  "txt",
  "epub"
] as const;

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.apple.pages",
  "application/octet-stream",
  "text/plain",
  "application/epub+zip"
] as const;

export const MAX_UPLOAD_BYTES = Number(process.env.UPLOAD_MAX_BYTES ?? 20 * 1024 * 1024);

export const SERVICE_CARDS = [
  {
    title: "Editorial Development",
    description: "Developmental editing, manuscript review, and line editing for publication readiness."
  },
  {
    title: "Design & Formatting",
    description: "Professional interior formatting and cover design for print and digital distribution."
  },
  {
    title: "ISBN & Metadata",
    description: "ISBN assignment support, metadata optimization, and catalog preparation."
  },
  {
    title: "Distribution",
    description: "Global print and digital distribution setup across major retailers and platforms."
  }
];
