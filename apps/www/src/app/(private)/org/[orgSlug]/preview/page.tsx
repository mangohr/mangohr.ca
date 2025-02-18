import { redirect, RedirectType } from "next/navigation"
import { getDocumentDownloadUrl } from "@/_server/actions/document"
import { z } from "zod"

export default async function Page({ searchParams }: { searchParams?: any }) {
  const { path } = z
    .object({
      type: z.enum(["document"]),
      path: z.preprocess((v) => decodeURIComponent(v as any), z.string().url()),
    })
    .parse(searchParams)

  const url = await getDocumentDownloadUrl({ path })

  return redirect(url, RedirectType.replace)
}
