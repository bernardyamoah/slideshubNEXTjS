
import { UserAuthForm } from "../components/user-register"; 


import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuth } from "@/components/component/user-auth";
import Link from "next/link";
import Image from "next/image";



export default function Page() 
	{

	return (

<>
<div className="hidden">
        <Image
          src="https://images.unsplash.com/photo-1602378870605-104fe426104f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container pb-10 backdrop-blur-lg relative  lg:h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 sm:top-4 md:right-8 md:top-8 -top-16"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1602378870605-104fe426104f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"/>
		 </div>
        <div className="lg:p-8">
          <div className="mx-auto  flex w-full flex-col justify-center space-y-8 sm:w-[350px] ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            {/* <UserAuth/> */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
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
      </div>

</>



	)
}
