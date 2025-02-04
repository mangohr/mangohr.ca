import React, { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const tabs = [
  {
    title: "Employee Management",
    desc: "From tracking vacations to managing employee profiles, our employee management module keeps everything organized and easy in one place",
    keys: [
      "Time off",
      "Attendance",
      "Employee Profiles",
      "Company Profiles",
      "Reporting and Analytics",
    ],
    img: {
      size: 500,
    },
  },
  {
    title: "Onboarding & Offboarding",
    desc: "Give a warm welcome your new employees and get your former employees a seamless transition, because remember Glassdoor exists",
    keys: [
      "Automation workflow",
      "Signatures",
      "Task checklist",
      "Contract management",
      "Templates (handbook etc.)",
    ],
    img: {
      size: 500,
    },
  },
  {
    title: "Asset Management",
    desc: "Because you need to track more than just your employees!",
    keys: [
      "Software Management",
      "Hardware Management",
      "Audit History",
      "Contract Management",
    ],
    img: {
      size: 500,
    },
  },
  {
    title: "Performance Management",
    desc: "",
    keys: [
      "Review cycles w/reminders",
      "Templates and workflow",
      "1:1 management (agenda, goal setting)",
      "360 feedback for employees and managers",
    ],
    img: {
      size: 500,
    },
  },
  {
    title: "Communications",
    desc: "",
    keys: ["Company announcements", "User groups", "Surveys", "eNPS"],
    img: {
      size: 250,
    },
  },
  {
    title: "Recruiting",
    desc: "Find, track, and snag top talent with our recruiting module—because hiring great people shouldn’t feel like a full-time job",
    keys: [""],
    img: {
      size: 400,
    },
  },
  {
    title: "Training",
    desc: "Staying secure doesn’t have to be boring - our fun, easy-to-digest training keeps your team cyber-savvy!",
    keys: [],
    img: {
      size: 500,
    },
  },
  {
    title: "Team Building & Rewards",
    desc: "Bring your team together with our rewards and team-building module—think gift cards, trivia nights, and everything fun in between",
    keys: [],
    img: {
      size: 500,
    },
  },
  {
    title: "Scheduling",
    desc: "Say goodbye to scheduling headaches—our module makes booking shifts and managing time off a breeze, with everything in its right place",
    keys: [],
    img: {
      size: 500,
    },
  },
]

export default function Features() {
  const [curr, setCurr] = useState(0)
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <div className="flex w-[calc(100px*9)] md:w-[calc(140px*9)] ">
          {tabs.map((t, i) => (
            <div
              key={i}
              onClick={() => setCurr(i)}
              className={cn(
                "group flex cursor-pointer flex-col items-center justify-start space-y-2 rounded-xl border border-transparent p-2 text-center md:p-4",
                curr === i && "bg-primary/20 border-primary/30"
              )}
            >
              <span>
                <Image
                  src={`/assets/svgs/icon-${i}.svg`}
                  alt={t.title}
                  width={32}
                  height={32}
                />
              </span>
              <span className="text-secondary group-hover:text-primary text-xs font-medium md:text-base">
                {t.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary/20 grid-cols-[45%,auto] rounded-xl p-6 md:grid md:p-20">
        <div className="space-y-8">
          <h1 className="text-4xl font-medium">{tabs[curr].title}</h1>
          <p>{tabs[curr].desc}</p>
          <ul className="space-y-2">
            {tabs[curr].keys.map((k, i) => (
              <li key={i} className="flex items-center gap-2">
                <span>
                  <Check className="size-4" />
                </span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center justify-end md:flex">
          <Image
            key={curr}
            src={`/assets/features/img-${curr}.png`}
            alt=""
            width={tabs[curr].img.size}
            height={tabs[curr].img.size}
            quality={90}
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}
