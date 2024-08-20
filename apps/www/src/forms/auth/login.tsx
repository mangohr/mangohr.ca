"use client"

import { useTransition } from "react"
import Link from "next/link"
import { googleSignIn, signInWithEmail } from "@/_server/actions/auth"
import { useAuthStore } from "@/stores/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/custom/icons"

const FormSchema = z.object({
  email: z.string().email(),
})

export const AuthForm = () => {
  const { email, update } = useAuthStore()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      update(data)
      signInWithEmail(data)
    })
  })

  return (
    <div className="relative flex h-full flex-col justify-center p-10">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "space-x-2")}
        >
          <ArrowLeftIcon /> <span>Home</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to MangoHR
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to login
          </p>
        </div>
        <div className={"grid gap-6"}>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Work Email</FormLabel>

                    <FormControl>
                      <Input placeholder="example@company.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={pending}>
                {pending && <Loader2 className="animate-spin" />}
                <span> Continue with Email</span>
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form action={googleSignIn} className="w-full">
            <Button
              variant="outline"
              type="submit"
              className="w-full"
              disabled={pending}
            >
              <GoogleIcon className="mr-2 size-4" />
              Continue with Google
            </Button>
          </form>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
