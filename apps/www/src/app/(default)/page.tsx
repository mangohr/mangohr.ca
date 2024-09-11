import Image from "next/image"
import {
  ArrowUpRight,
  Blocks,
  Clock,
  FileCheck,
  Presentation,
  TreePalm,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DefaultNav from "@/components/navs/default"

const solutions = [
  {
    title: "Employee Management",
    desc: "Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations.",
    icon: Users,
  },
  {
    title: "Document Management",
    icon: FileCheck,
  },
  {
    title: "Onboarding & Off-boarding",
    icon: Presentation,
  },
  {
    title: "Time Off Management",
    icon: TreePalm,
  },
  {
    title: "Asset Tracking",
    icon: Blocks,
  },
  {
    title: "Attendance and Time Tracking",
    icon: Clock,
  },
]

export default async function Home() {
  return (
    <div className="space-y-32">
      <section className="bg-green relative overflow-hidden pb-24">
        <DefaultNav />
        <div className="m-auto max-w-screen-xl pt-16">
          <Image
            src="/assets/shapes/leaves1.png"
            alt=""
            width={500}
            height={500}
            className="absolute -bottom-20 -left-40"
          />
          <Image
            src="/assets/shapes/mango.png"
            alt=""
            width={500}
            height={500}
            className="absolute -right-16 -top-16 object-contain"
          />
          <div className="text-primary-foreground relative z-10 grid grid-cols-[60%,auto] items-center gap-6">
            <div className="space-y-4">
              <h1 className="text-6xl font-semibold leading-tight">
                <span className="text-[#7AEDCB]">HR Management</span>, Free,
                Simple and Easy to Use
              </h1>
              <p className="max-w-2xl text-xl">
                Proudly Canadian HR Solution: Empowering Your Workforce,
                Simplifying Your Success
              </p>
              <br />
              <br />
              <Button
                className="gap-4 rounded-full text-lg"
                variant={"black"}
                size={"lg"}
              >
                <span>Try for free</span>
                <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
                  <ArrowUpRight className="size-4" />
                </span>
              </Button>
            </div>
            <div>
              <Image
                src="/assets/shapes/hero.png"
                alt=""
                width={550}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Solutions */}
      <section className="m-auto max-w-screen-xl">
        <Title name="You Can Do It All with MangoHR" label="Our Solutions" />
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-4">
            {solutions.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "text-muted-foreground flex gap-4 p-4",
                  i === 0 &&
                    "bg-light-green/10 text-foreground [&_svg]:stroke-light-green"
                )}
              >
                <div className="relative top-0.5">
                  <m.icon />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green rounded-lg"></div>
        </div>
      </section>
      {/* Video */}
      <section className="m-auto max-w-screen-xl">
        <Title name="See It in Action" label="Demo Video" />
        <div className="bg-muted m-auto aspect-video max-w-screen-lg"></div>
      </section>
      {/* Why US */}
      <section className="m-auto max-w-screen-xl">
        <div className="bg-green text-primary-foreground relative grid grid-cols-[40%,auto] overflow-hidden rounded-2xl p-24">
          <div className="">
            <Image
              src="/assets/shapes/mango1.png"
              alt=""
              width={600}
              height={800}
              className="absolute -left-20 -top-1/3"
            />{" "}
          </div>
          <div className="space-y-8">
            <h2 className="text-primary-foreground text-6xl font-semibold">
              Why Us
            </h2>
            <div></div>
            <p className="text-lg">
              Customer success is at the heart of what we do. We're dedicated to
              helping Canadian SMBs thrive, which is why our CoreHR package is
              always free—no credit card needed. We want you to experience our
              services fully and confidently without any obligation. Every
              package comes with 24/7 support for priority issues and a
              dedicated customer success manager to ensure mangoHR meets your
              needs perfectly.
            </p>
            <Button
              className="gap-4 rounded-full text-lg"
              variant={"black"}
              size={"lg"}
            >
              <span>Book a demo</span>
              <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
                <ArrowUpRight className="size-4" />
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function Title({ label, name }: { label: string; name: string }) {
  return (
    <div className="mb-20 flex flex-col items-center justify-center space-y-4">
      <p className="text-primary font-semibold">{label.toUpperCase()}</p>
      <h2 className="text-5xl font-semibold">{name}</h2>
    </div>
  )
}
