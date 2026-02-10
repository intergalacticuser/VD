import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION ?? "us-east-1";
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";

export const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle,
  credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined
});

export const bucketName = process.env.S3_BUCKET ?? "vdpublishing";

export async function getPresignedUploadUrl(params: {
  key: string;
  contentType: string;
  expiresIn?: number;
}): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: params.key,
    ContentType: params.contentType
  });

  return getSignedUrl(s3, command, { expiresIn: params.expiresIn ?? 900 });
}

export async function getPresignedDownloadUrl(params: {
  key: string;
  expiresIn?: number;
}): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: params.key
  });

  return getSignedUrl(s3, command, { expiresIn: params.expiresIn ?? 600 });
}
