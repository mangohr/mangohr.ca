"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useViewport } from "@/context/viewport"
// import { GetStripeProductsResult } from "@/features/stripe/server.actions"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import DefaultFAQS from "@/components/faqs"
import DefaultNav from "@/components/navs/default"

import { Head } from "../../components/custom/typography"
import Demo from "./components/demo"
import Features from "./components/features"
// import Pricing from "./components/pricing"
import Startup from "./components/startup"
import WhyUs from "./components/why-us"

export default function PageClient() {
  const sectionClass = "p-4 md:p-10 m-auto max-w-[1368px]"
  const { isMobile } = useViewport()

  return (
    <>
      <DefaultNav />
      <div className="space-y-16 lg:space-y-24">
        <section className={sectionClass}>
          <div className="bg-dark-green relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-20">
            <div className="">
              <Image
                src="/assets/shapes/leaves1.png"
                alt=""
                width={502}
                height={429}
                quality={90}
                className="absolute -bottom-28 -left-20"
              />
              <Image
                src="/assets/shapes/leaves1.png"
                alt=""
                width={502}
                height={429}
                quality={90}
                className="absolute -right-20 -top-28 rotate-180"
              />

              <div className="text-background relative z-10 grid items-center gap-6 lg:grid-cols-[56%,auto]">
                <div className="space-y-6 py-10 md:py-0">
                  <h1 className="relative text-3xl font-medium leading-tight sm:text-6xl">
                    <span className="text-primary block">
                      Hire, Train, Retain
                    </span>{" "}
                    <span className="relative">
                      All in One Place{" "}
                      <span className="absolute -right-12 -top-24 -z-10 sm:top-0">
                        <Image
                          src="/assets/shapes/free.png"
                          alt=""
                          width={65}
                          height={65}
                          quality={90}
                        />
                      </span>
                    </span>
                  </h1>
                  <p className="max-w-xl text-base sm:text-lg md:text-xl">
                    We know what you’re thinking, another HR software? But I
                    promise we’re different - scroll down to see all our amazing
                    features and what sets us apart. I forgot to mention, our
                    CoreHR package is{" "}
                    <span className="text-primary">Free Forever!</span>
                  </p>

                  {!isMobile && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  <div>
                    {" "}
                    <Link
                      href={"/org"}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-fit gap-4 rounded-full  sm:text-lg"
                      )}
                    >
                      <span>Try for free</span>
                      <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <Image
                    src="/assets/shapes/hero.png"
                    alt=""
                    width={550}
                    height={500}
                    quality={90}
                    className="relative md:right-10"
                  />
                  <Image
                    src="/assets/shapes/mango.png"
                    alt=""
                    width={214}
                    height={206}
                    quality={90}
                    className="absolute bottom-0 right-4 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={sectionClass}>
          <Head name="You Can Do It All with MangoHR" label="Our Solutions" />
          <Features />
        </section>
        <section className={sectionClass}>
          <Demo />
        </section>
        <section className={cn("bg-light-green py-10")}>
          <div className={cn(sectionClass)}>
            <WhyUs />
          </div>
        </section>
        {/* <section className={sectionClass}>
          <Pricing />
        </section> */}
        <section className={sectionClass}>
          <Startup />
        </section>{" "}
        <DefaultFAQS />
      </div>
    </>
  )
}

// import { Fragment } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import {
//   ArrowUpRight,
//   Blocks,
//   Check,
//   Clock,
//   FileCheck,
//   Play,
//   Presentation,
//   TreePalm,
//   Users,
// } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import DefaultFAQS from "@/components/faqs"
// import DefaultNav from "@/components/navs/default"
// import PricingCards from "@/components/pricing/card"

// const solutions = [
//   {
//     title: "Employee Management",
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//     icon: Users,
//   },
//   {
//     title: "Document Management",
//     icon: FileCheck,
//   },
//   {
//     title: "Onboarding & Off-boarding",
//     icon: Presentation,
//   },
//   {
//     title: "Time Off Management",
//     icon: TreePalm,
//   },
//   {
//     title: "Asset Tracking",
//     icon: Blocks,
//   },
//   {
//     title: "Attendance and Time Tracking",
//     icon: Clock,
//   },
// ]

// const eyebrows = [
//   {
//     title: "Canadian data centres",
//     icon: Check,
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//   },
//   {
//     title: "Canadian data centres",
//     icon: Check,
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//   },
//   {
//     title: "Canadian data centres",
//     icon: Check,
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//   },
//   {
//     title: "Canadian data centres",
//     icon: Check,
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//   },
//   {
//     title: "Canadian data centres",
//     icon: Check,
//     desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
//   },
// ]

// export default async function Home() {
//   return (
//     <div className="space-y-32">
//       <section className="bg-green relative overflow-hidden pb-24">
//         <DefaultNav />
//         <div className="m-auto max-w-screen-xl px-4 pt-16 xl:px-0">
//           <Image
//             src="/assets/shapes/leaves1.png"
//             alt=""
//             width={500}
//             height={500}
//             quality={70}
//             className="absolute -bottom-20 -left-40"
//           />
//           <Image
//             src="/assets/shapes/mango.png"
//             alt=""
//             width={500}
//             height={500}
//             quality={70}
//             className="absolute -right-16 -top-16 object-contain"
//           />
//           <div className="text-primary-foreground relative z-10 grid grid-cols-[60%,auto] items-center gap-6">
//             <div className="space-y-4">
//               <h1 className="text-6xl font-semibold leading-tight">
//                 <span className="text-[#7AEDCB]">HR Management</span>, Free,
//                 Simple and Easy to Use
//               </h1>
//               <p className="max-w-2xl text-xl">
//                 Proudly Canadian HR Solution: Empowering Your Workforce,
//                 Simplifying Your Success
//               </p>
//               <br />
//               <br />
//               <Button
//                 className="gap-4 rounded-full text-lg"
//                 variant={"black"}
//                 size={"lg"}
//               >
//                 <span>Try for free</span>
//                 <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
//                   <ArrowUpRight className="size-4" />
//                 </span>
//               </Button>
//             </div>
//             <div>
//               <Image
//                 src="/assets/shapes/hero.png"
//                 alt=""
//                 width={490}
//                 height={445}
//                 quality={70}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Solutions */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <Head name="You Can Do It All with MangoHR" label="Our Solutions" />
//         <div className="grid grid-cols-2 gap-12">
//           <div className="space-y-4">
//             {solutions.map((m, i) => (
//               <div
//                 key={i}
//                 className={cn(
//                   "text-muted-foreground flex gap-4 p-4",
//                   i === 0 &&
//                     "bg-light-green/10 text-foreground [&_svg]:stroke-light-green"
//                 )}
//               >
//                 <div className="relative top-0.5">
//                   <m.icon />
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-semibold">{m.title}</h3>
//                   <p>{m.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="relative flex items-center justify-center">
//             <div className="bg-green absolute -right-56 rounded-lg p-14">
//               <Image
//                 src="/assets/shapes/solution1.png"
//                 alt=""
//                 width={650}
//                 height={650}
//                 quality={70}
//                 className="rounded-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Video */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <Head name="See It in Action" label="Demo Video" />
//         <div className="bg-muted relative m-auto aspect-auto max-w-screen-lg">
//           <Image
//             src="/assets/shapes/solution1.png"
//             alt=""
//             width={800}
//             height={800}
//             quality={70}
//             className="m-auto"
//           />
//           <div className="bg-foreground absolute left-1/2 top-1/2 flex size-16 items-center justify-center rounded-full border">
//             <Play className="stroke-background size-10" />
//           </div>
//         </div>
//       </section>
//       {/* Why US */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <div className="bg-green text-primary-foreground relative grid grid-cols-[40%,auto] overflow-hidden rounded-2xl p-24">
//           <div className="">
//             <Image
//               src="/assets/shapes/mango1.png"
//               alt=""
//               width={600}
//               height={800}
//               quality={70}
//               className="absolute -left-20 -top-1/3"
//             />{" "}
//           </div>
//           <div className="space-y-8">
//             <h2 className="text-primary-foreground text-6xl font-semibold">
//               Why Us
//             </h2>
//             <div></div>
//             <p className="text-lg">
//               Customer success is at the heart of what we do. We&apos;re
//               dedicated to helping Canadian SMBs thrive, which is why our CoreHR
//               package is always free—no credit card needed. We want you to
//               experience our services fully and confidently without any
//               obligation. Every package comes with 24/7 support for priority
//               issues and a dedicated customer success manager to ensure mangoHR
//               meets your needs perfectly.
//             </p>
//             <Button
//               className="gap-4 rounded-full text-lg"
//               variant={"black"}
//               size={"lg"}
//             >
//               <span>Book a demo</span>
//               <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
//                 <ArrowUpRight className="size-4" />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </section>
//       {/* Eyebrow Section */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <Head
//           name="Built Compatibility"
//           label="Eyebrow"
//           desc="MangoHR takes data privacy seriously, and abides by Canadian law. See below how we protect your company’s and employee’s data."
//         />
//         <div className="relative">
//           <span className="via-light-green absolute left-[49.92%] block h-full w-0.5 bg-gradient-to-b from-transparent to-transparent" />
//           <br /> <br /> <br />
//           <div className="grid grid-cols-[43%,auto,43%] gap-y-12">
//             {eyebrows.map((e, i) => {
//               const odd = i & 1
//               const comp = (
//                 <div
//                   className={cn(
//                     "flex flex-col space-y-2",
//                     odd ? "items-end justify-end text-end" : "text-start"
//                   )}
//                 >
//                   <span className="flex size-10 items-center justify-center rounded-md border">
//                     <e.icon className="size-5" />
//                   </span>
//                   <h3 className="text-xl font-semibold">{e.title}</h3>
//                   <p className="max-w-lg">{e.desc}</p>
//                 </div>
//               )
//               return (
//                 <Fragment key={i}>
//                   {odd ? comp : <div></div>}
//                   <div className="flex items-start justify-center">
//                     <span className="bg-light-green block size-4 rounded-full" />
//                   </div>
//                   {!odd ? comp : <div></div>}
//                 </Fragment>
//               )
//             })}
//           </div>
//         </div>
//       </section>
//       {/* Pricing Section */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <Head
//           name="Flexible Pricing"
//           label="Packages"
//           desc="Built with SMBs in mind. Our CoreHR package will be free forever - yes you read that right - free forever! Only pay for what you need and for the employees you have. Truly flexible pricing."
//         />
//         <PricingCards />
//         <br />
//         <br />
//         <div className="space-y-2">
//           <div className="text-center">
//             Not seeing a module you need? Chat to us about our add-on modules
//           </div>
//           <div className="text-center">
//             <Link
//               href={""}
//               className="text-green inline-flex items-center justify-center space-x-1 font-semibold"
//             >
//               <span>Contact Us</span>
//               <span className="bg-green flex size-5 items-center justify-center rounded-full">
//                 <ArrowUpRight className="size-4 stroke-white" />
//               </span>
//             </Link>
//           </div>
//         </div>
//       </section>
//       {/* Startup */}
//       <section className="m-auto max-w-screen-xl px-4 xl:px-0">
//         <div className="bg-green text-primary-foreground relative grid grid-cols-[60%,auto] overflow-hidden rounded-2xl p-24">
//           <div className="space-y-8">
//             <h2 className="text-primary-foreground text-6xl font-semibold">
//               Are you a Startup?
//             </h2>
//             <div></div>
//             <p className="text-lg">
//               Ready to save on our premium packages? At mangoHR, we offer a
//               Startup Program designed to support your growth while keeping
//               costs down. Get in touch to learn how you can access discounted
//               rates on our top-tier HR solutions and start building a solid
//               foundation for your business today. Let us help you succeed
//               without breaking the bank!
//             </p>
//             <Button
//               className="gap-4 rounded-full text-lg"
//               variant={"black"}
//               size={"lg"}
//             >
//               <span>Book a Call</span>
//               <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
//                 <ArrowUpRight className="size-4" />
//               </span>
//             </Button>
//           </div>
//           <div className="">
//             <Image
//               src="/assets/shapes/mango2.png"
//               alt=""
//               width={519}
//               height={469}
//               quality={70}
//               className="absolute -right-8 -top-0"
//             />{" "}
//           </div>
//         </div>
//       </section>
//       <DefaultFAQS />
//     </div>
//   )
// }
