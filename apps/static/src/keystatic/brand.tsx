import Image from "next/image"
import { siteConfig } from "@/site.config"

export const brand = {
  name: siteConfig.site.name,
  mark: ({ colorScheme }) => {
    let path =
      colorScheme === "dark"
        ? "/assets/logo/ico-white.png"
        : "/assets/logo/ico-white.png"

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={path} alt="" width={"30px"} />
  },
}
