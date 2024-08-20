"use client"

import Link from "next/link"
import { googleSignIn } from "@/_server/actions/auth"
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
import { Label } from "@/components/ui/label"
import { GoogleIcon } from "@/components/custom/icons"

const FormSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  email: z.string().email(),
})

export const AuthForm = ({ type = "login" }: { type: "login" | "signup" }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // sonner({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="relative flex h-full flex-col justify-center p-8">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "space-x-2")}
        >
          <ArrowLeftIcon /> <span>Home</span>
        </Link>
        <Link
          href={`/auth/${type === "signup" ? "login" : "signup"}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <span>{type === "signup" ? "Log In" : "Sign Up"}</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {type === "signup" ? "Create an account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {type === "signup"
              ? "Enter your details below to create your account"
              : "Enter your details below to login"}
          </p>
        </div>
        <div className={"grid gap-6"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Work Email</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {type === "login" && (
                        <Link
                          href="/auth/forgot-password"
                          className="ml-auto inline-block text-xs underline"
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </div>{" "}
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {type === "login" ? "Log In" : "Sign Up"}
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
              disabled={false}
            >
              {false ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 size-4" />
              )}
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
