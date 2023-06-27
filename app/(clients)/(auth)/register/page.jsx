'use client'
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { signUp } from "@/lib/functions";
import { CheckCircle, EnvelopeSimple, Lock, User } from "@phosphor-icons/react";

export default function Page() 
	{
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === cpassword) {
			signUp(name, email, password, router);
			setName("");
			setEmail("");
			setPassword("");
			setCPassword("");
		}
	};

	return (
		<div>
			<Head>
				<title>Register </title>
				<meta
					name='description'
					content='An event ticketing system built with NextJS and Firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='w-full flex items-center justify-between min-h-[100vh]'>
				<div className='md:w-[60%] w-full flex flex-col items-center justify-center min-h-[100vh] px-[30px] py-[30px] relative'>
					<Link href='/' passHref>
						<h2 className='text-2xl font-medium mb-6'>Create an account</h2>
					</Link>
					<form
						className='w-full flex flex-col justify-center'
						onSubmit={handleSubmit}
					>
						<label htmlFor='name'>Name</label>
						<div className='w-full relative'>
							<input
								type='text'
								name='name'
								className='border px-10 py-2 mb-3 rounded-md w-full'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<User size={32} />
						</div>
						<label htmlFor='email'>Email address</label>
						<div className='w-full relative'>
							<input
								type='email'
								name='email'
								className='border px-10 py-2 mb-3 rounded-md w-full'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<EnvelopeSimple size={32} className='bg-red-200' />
							
						</div>
						<label htmlFor='password'>Password</label>
						<div className='w-full relative'>
							<input
								type='password'
								name='password'
								className='border px-10 py-2 mb-4 rounded-md w-full'
								minLength={8}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Lock size={32}/>
							{password === cpassword && cpassword !== "" && (
							<CheckCircle size={32} />
							)}
						</div>
						<label htmlFor='cpassword'>Confirm Password</label>
						<div className='w-full relative'>
							<input
								type='password'
								name='cpassword'
								className='border px-10 py-2 mb-4 rounded-md w-full'
								required
								minLength={8}
								value={cpassword}
								onChange={(e) => setCPassword(e.target.value)}
							/>
							<Lock size={32} />
							{password === cpassword && cpassword !== "" && (
								<CheckCircle size={32} />
							)}
						</div>
						{password !== cpassword && (
							<p className='text-red-500 mb-2'>Password does not match</p>
						)}
						<button
							type='submit'
							className='bg-[#FFD95A] p-3 font-medium hover:bg-[#C07F00] hover:text-[#FFF8DE] mb-3 rounded-md'
						>
							REGISTER
						</button>
						<p className='text-center'>
							Already have an account?{" "}
							<Link href='/login' className='text-[#C07F00]'>
								Sign in
							</Link>
						</p>
					</form>
					<div className='absolute bottom-5 left-5'>
						<p className='opacity-50 text-sm'>
							
							{new Date().getFullYear()}{" "}
						</p>
					</div>
				</div>
				
			</main>
		</div>
	)
}
