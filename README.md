# VD Publishing

Modern, studio-style publishing services platform with public marketing site, user dashboard, and admin panel.

## Stack
- Next.js (App Router) + TypeScript
- PostgreSQL + Prisma
- NextAuth (Auth.js) with Credentials + Google + Apple
- S3-compatible storage (AWS S3 / MinIO)
- TailwindCSS + Zod
- Email queue via nodemailer + outbox table

## Features
- Public marketing site with services, upload, and contact
- Guest manuscript upload with reference ID
- Auth with email/password + OAuth (Google/Apple)
- User dashboard: projects, files, messages, settings, export
- Admin panel: users, projects, inquiries, content blocks, logs
- Secure file access with presigned URLs
- GDPR basics: privacy/terms, data export, account deletion
- Notifications + email queue

## Quick Start (Local)
1. Install dependencies
```bash
npm install
```

2. Configure environment
```bash
cp .env.example .env
```
Update required values in `.env` (database, auth, OAuth, email, S3).

3. Start Postgres + MinIO (optional)
```bash
docker compose up -d db minio minio-init
```

4. Run migrations + seed
```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Start dev server
```bash
npm run dev
```

## Production Build
```bash
npm run build
npm run start
```

## Docker (Staging Ready)
```bash
docker compose up --build
```

## Storage (S3/MinIO)
- Update `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY` in `.env`.
- For MinIO via compose, access console at `http://localhost:9001`.

## Email Outbox Job
Trigger processing of queued emails:
```bash
curl -X POST http://localhost:3000/api/jobs/process-outbox
```
Use a cron or background scheduler to call it periodically.

## API Documentation
Base URL: `APP_URL` (default `http://localhost:3000`)

### Auth
- `POST /api/auth/register`
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Author","email":"author@example.com","password":"ChangeMe123!"}'
```
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Projects
- `GET /api/projects`
- `POST /api/projects`
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Book","description":"Memoir"}'
```
- `POST /api/projects/:id/messages`
- `POST /api/projects/:id/files/presign`
- `POST /api/projects/:id/files/complete`

### Files
- `GET /api/files`
- `GET /api/files/:id/download`

### Guest Upload
- `POST /api/upload/guest`
- `PUT /api/upload/guest`

### Inquiries
- `POST /api/inquiries`

### Account
- `POST /api/account/profile`
- `POST /api/account/password`
- `POST /api/account/delete`
- `GET /api/export/me`

### Admin (ADMIN role required)
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`
- `GET /api/admin/projects`
- `POST /api/admin/projects/:id/status`
- `POST /api/admin/projects/:id/messages`
- `POST /api/admin/projects/:id/files/presign`
- `POST /api/admin/projects/:id/files/complete`
- `GET /api/admin/inquiries`
- `PATCH /api/admin/inquiries/:id`
- `GET /api/admin/content`
- `PATCH /api/admin/content/:id`
- `GET /api/admin/logs`

## Acceptance Checklist
- Public pages: home/services/how-it-works/upload/about/contact/privacy/terms
- Phone number displayed in public header/footer/contact
- Auth: credentials + Google/Apple OAuth
- User dashboard with projects, files, messages, settings, export
- Admin panel with users, projects, inquiries, content blocks, audit logs
- Upload support: pdf, doc/docx, pages, txt, epub
- File access control with presigned URLs
- Account deletion with soft delete + anonymization
- GDPR basics: privacy/terms, export endpoint, cookie consent
- Notifications + email outbox job
- Docker and staging-ready setup
