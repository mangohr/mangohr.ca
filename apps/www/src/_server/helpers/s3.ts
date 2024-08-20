import { env } from "@/env"
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: env.S3_UPLOAD_REGION,

  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
  signingRegion: env.S3_UPLOAD_REGION,
})

export async function getDownloadUrl(objectName: string) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.S3_UPLOAD_BUCKET,
      Key: objectName,
    }),
    { expiresIn: 3600 }
  )
}

export async function getPresignedUrl({
  key,
  contentType,
  contentLength,
}: {
  contentLength: number
  contentType: string
  key: string
}) {
  // const { url, fields } = await createPresignedPost(s3Client, {
  //   Bucket: env.S3_UPLOAD_BUCKET,
  //   Key: key,
  //   Conditions: [
  //     // ["eq", "$Content-Length", contentLength.toString()]  , // Exact content length
  //     // ["starts-with", "$Content-Type", contentType],
  //   ],
  //   Fields: {
  //     acl: "public-read",
  //     "Content-Type": contentType,
  //   },
  //   Expires: 3600, // 60 minutes
  // })

  const url = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: env.S3_UPLOAD_BUCKET,
      Key: key,
      ContentType: contentType,
      ContentLength: contentLength,
    }),
    { expiresIn: 3600 }
  )

  return url
}

export async function getFileUrl({ key }: { key: string }) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.S3_UPLOAD_BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 }
  )

  return url
}
