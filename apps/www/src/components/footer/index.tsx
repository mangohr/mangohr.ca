import React from "react"
import Image from "next/image"
import Link from "next/link"
import { navs } from "@/constants/links"

import { cn } from "@/lib/utils"

export default function DefaultFooter() {
  return (
    <footer className="m-auto max-w-screen-xl space-y-8 py-16">
      <div className="flex  items-center justify-between">
        <Link href={navs.home.url}>
          <Image
            src="/assets/logo/full.png"
            width={120}
            height={110}
            alt="MangoHR"
          />
        </Link>

        <div className="flex w-full max-w-md justify-between space-x-4 text-lg">
          <Link href={"/"}>Contact Info</Link>
          <Link href={"/"}>Solutions</Link>
          <Link href={"/"}>Company</Link>
          <Link href={"/"}>Resources</Link>
        </div>
        <div className="flex gap-4">
          <Link
            href={"/"}
            className={cn(
              "border-light-green bg-light-green/10 rounded-md border-2 p-2"
            )}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8.75C17.5913 8.75 19.1174 9.38214 20.2426 10.5074C21.3679 11.6326 22 13.1587 22 14.75V21.75H18V14.75C18 14.2196 17.7893 13.7109 17.4142 13.3358C17.0391 12.9607 16.5304 12.75 16 12.75C15.4696 12.75 14.9609 12.9607 14.5858 13.3358C14.2107 13.7109 14 14.2196 14 14.75V21.75H10V14.75C10 13.1587 10.6321 11.6326 11.7574 10.5074C12.8826 9.38214 14.4087 8.75 16 8.75Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9.75H2V21.75H6V9.75Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 6.75C5.10457 6.75 6 5.85457 6 4.75C6 3.64543 5.10457 2.75 4 2.75C2.89543 2.75 2 3.64543 2 4.75C2 5.85457 2.89543 6.75 4 6.75Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={"/"}
            className={cn(
              "border-light-green bg-light-green/10 rounded-md border-2 p-2"
            )}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 7.25H17.51M7 2.75H17C19.7614 2.75 22 4.98858 22 7.75V17.75C22 20.5114 19.7614 22.75 17 22.75H7C4.23858 22.75 2 20.5114 2 17.75V7.75C2 4.98858 4.23858 2.75 7 2.75ZM16 12.12C16.1234 12.9522 15.9813 13.8022 15.5938 14.549C15.2063 15.2958 14.5931 15.9014 13.8416 16.2797C13.0901 16.6579 12.2384 16.7896 11.4078 16.6559C10.5771 16.5223 9.80976 16.1301 9.21484 15.5352C8.61992 14.9402 8.22773 14.1729 8.09407 13.3422C7.9604 12.5116 8.09207 11.6599 8.47033 10.9084C8.84859 10.1569 9.45419 9.54374 10.201 9.15624C10.9478 8.76874 11.7978 8.62659 12.63 8.75C13.4789 8.87588 14.2649 9.27146 14.8717 9.87831C15.4785 10.4851 15.8741 11.2711 16 12.12Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={"/"}
            className={cn(
              "border-light-green bg-light-green/10 rounded-md border-2 p-2"
            )}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.50001 17.75C1.80143 14.4533 1.80143 11.0467 2.50001 7.75C2.5918 7.41521 2.76914 7.11007 3.01461 6.86461C3.26008 6.61914 3.56522 6.44179 3.90001 6.35C9.26346 5.46146 14.7366 5.46146 20.1 6.35C20.4348 6.44179 20.7399 6.61914 20.9854 6.86461C21.2309 7.11007 21.4082 7.41521 21.5 7.75C22.1986 11.0467 22.1986 14.4533 21.5 17.75C21.4082 18.0848 21.2309 18.3899 20.9854 18.6354C20.7399 18.8809 20.4348 19.0582 20.1 19.15C14.7366 20.0387 9.26344 20.0387 3.90001 19.15C3.56522 19.0582 3.26008 18.8809 3.01461 18.6354C2.76914 18.3899 2.5918 18.0848 2.50001 17.75Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 15.75L15 12.75L10 9.75V15.75Z"
                stroke="#079445"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        {" "}
        <div className="text-muted-foreground flex gap-12">
          <Link href={navs.privacy.url}>{navs.privacy.name}</Link>
          <Link href={navs.terms.url}>{navs.terms.name}</Link>
        </div>
        <p className="mt-auto">© Copyright 2023 Mangohr</p>
      </div>
    </footer>
  )
}
