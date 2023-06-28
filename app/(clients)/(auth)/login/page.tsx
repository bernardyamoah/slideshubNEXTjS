import Link from "next/link";

import Image from "next/image"


import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "../components/user-auth"; 




export default function Login() 
	{
	
	return (

		<>
		 <div className="hidden ">
        <Image
          src="https://images.unsplash.com/photo-1602378870605-104fe426104f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="https://images.unsplash.com/photo-1618316224214-a5bac0651def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1155&q=80"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container backdrop-blur-lg relative h-screen lg:h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
         Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618316224214-a5bac0651def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1155&q=80')] bg-cover bg-center"/>
		 
         
        
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
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
		// <div>
		// 	<Head>
		// 		<title>Register</title>
		// 		<meta
		// 			name='description'
		// 			content=''
		// 		/>
		// 		<meta name='viewport' content='width=device-width, initial-scale=1' />
		// 		<link rel='icon' href='/favicon.ico' />
		// 	</Head>
		// 	<main className='w-full flex items-center justify-between min-h-[100vh]'>
		// 		<div className='md:w-[60%] w-full flex flex-col items-center justify-center min-h-[100vh] px-[30px] py-[30px] relative'>
		// 			<Link href='/' passHref>
		// 				<h2 className='text-2xl font-medium mb-6'>Log into your account</h2>
		// 			</Link>
		// 			<form
		// 				className='w-full flex flex-col justify-center'
		// 				onSubmit={handleSubmit}
		// 			>
		// 				<label htmlFor='email'>Email address</label>
		// 				<div className='w-full relative'>
		// 					<input
		// 						type='email'
		// 						name='email'
		// 						className='border px-10 py-2 mb-3 rounded-md w-full'
		// 						required
		// 						value={email}
		// 						onChange={(e) => setEmail(e.target.value)}
		// 					/>
		// 					<EnvelopeSimple size={32} className='bg-red-200' />
		// 				</div>
		// 				<label htmlFor='password'>Password</label>
		// 				<div className='w-full relative'>
		// 					<input
		// 						type='password'
		// 						name='password'
		// 						value={password}
		// 						onChange={(e) => setPassword(e.target.value)}
		// 						className='border px-10 py-2 mb-4 rounded-md w-full'
		// 						required
		// 					/>
		// 					<Lock size={32}/>
		// 				</div>

		// 				<button
		// 					type='submit'
		// 					className='bg-[#FFD95A] p-3 font-medium hover:bg-[#C07F00] hover:text-[#FFF8DE] mb-3 rounded-md'
		// 				>
		// 					SIGN IN
		// 				</button>
		// 				<p className='text-center'>
		// 					Don&apos;t have an account?{" "}
		// 					<Link href='/register' className='text-[#C07F00]'>
		// 						Register
		// 					</Link>
		// 				</p>
		// 			</form>
		// 			<div className='absolute bottom-5 left-5'>
		// 				<p className='opacity-50 text-sm'>
							
		// 					{new Date().getFullYear()}{" "}
		// 				</p>
		// 			</div>
		// 		</div>
				
		// 	</main>
		// </div>
	);
}

