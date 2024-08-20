import React from "react"
import Image from "next/image"

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="relative  h-screen flex-col items-center justify-center sm:grid md:max-w-none md:grid-cols-2 md:px-0">
      <div className="relative hidden h-screen flex-col overflow-hidden bg-muted p-10 text-white dark:border-r md:flex">
        <div className="absolute inset-0 bg-green" />
        <div className="absolute -bottom-48 -left-24 rotate-[270deg]">
          <Image
            src={"/assets/shapes/leaves.png"}
            alt="Leaves"
            width={600}
            height={600}
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src={"/assets/logo/full-white.png"}
            alt="Resume Mango Logo"
            width={110}
            height={75}
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has saved me countless hours by streamlining
              employee management. MangoHR is perfect for my company!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout
