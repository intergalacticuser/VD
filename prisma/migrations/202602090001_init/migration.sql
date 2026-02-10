-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "ProjectStatus" AS ENUM ('NEW', 'IN_REVIEW', 'IN_PROGRESS', 'COMPLETED');
CREATE TYPE "SenderRole" AS ENUM ('USER', 'ADMIN', 'SYSTEM');
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CLOSED');
CREATE TYPE "EmailOutboxStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "passwordHash" TEXT,
  "role" "Role" NOT NULL DEFAULT 'USER',
  "isDisabled" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "lastLoginAt" TIMESTAMP(3),
  "deletedAt" TIMESTAMP(3),
  "anonymizedAt" TIMESTAMP(3),
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" "ProjectStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "File" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "uploadedByUserId" TEXT,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "ext" TEXT NOT NULL,
  "sizeBytes" BIGINT NOT NULL,
  "storageKey" TEXT NOT NULL,
  "storageProvider" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MessageThread" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MessageThread_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Message" (
  "id" TEXT NOT NULL,
  "threadId" TEXT NOT NULL,
  "senderUserId" TEXT,
  "senderRole" "SenderRole" NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContentBlock" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "readAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "actorUserId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB NOT NULL,
  "ip" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GuestSubmission" (
  "id" TEXT NOT NULL,
  "referenceId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "description" TEXT,
  "fileName" TEXT NOT NULL,
  "fileExt" TEXT NOT NULL,
  "fileMime" TEXT NOT NULL,
  "sizeBytes" BIGINT NOT NULL,
  "storageKey" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GuestSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PasswordResetToken" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmailOutbox" (
  "id" TEXT NOT NULL,
  "toEmail" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "htmlBody" TEXT NOT NULL,
  "textBody" TEXT,
  "status" "EmailOutboxStatus" NOT NULL DEFAULT 'PENDING',
  "requestedById" TEXT,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "lastError" TEXT,
  "sentAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailOutbox_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId")
);

CREATE TABLE "Session" (
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier", "token")
);

CREATE TABLE "Authenticator" (
  "credentialID" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "credentialPublicKey" TEXT NOT NULL,
  "counter" INTEGER NOT NULL,
  "credentialDeviceType" TEXT NOT NULL,
  "credentialBackedUp" BOOLEAN NOT NULL,
  "transports" TEXT,
  CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId", "credentialID")
);

-- Indexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");
CREATE INDEX "Project_userId_idx" ON "Project"("userId");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE UNIQUE INDEX "File_storageKey_key" ON "File"("storageKey");
CREATE INDEX "File_projectId_idx" ON "File"("projectId");
CREATE INDEX "File_uploadedByUserId_idx" ON "File"("uploadedByUserId");
CREATE UNIQUE INDEX "MessageThread_projectId_key" ON "MessageThread"("projectId");
CREATE INDEX "MessageThread_createdAt_idx" ON "MessageThread"("createdAt");
CREATE INDEX "Message_threadId_idx" ON "Message"("threadId");
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
CREATE UNIQUE INDEX "ContentBlock_key_key" ON "ContentBlock"("key");
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "Notification_readAt_idx" ON "Notification"("readAt");
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");
CREATE UNIQUE INDEX "GuestSubmission_referenceId_key" ON "GuestSubmission"("referenceId");
CREATE UNIQUE INDEX "GuestSubmission_storageKey_key" ON "GuestSubmission"("storageKey");
CREATE INDEX "GuestSubmission_createdAt_idx" ON "GuestSubmission"("createdAt");
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");
CREATE INDEX "EmailOutbox_status_idx" ON "EmailOutbox"("status");
CREATE INDEX "EmailOutbox_createdAt_idx" ON "EmailOutbox"("createdAt");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- FKs
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "EmailOutbox" ADD CONSTRAINT "EmailOutbox_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
