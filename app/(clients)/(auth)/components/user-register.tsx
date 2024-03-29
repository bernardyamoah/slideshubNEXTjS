"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { handleGoogleSignIn, signUp } from "@/lib/functions";
import { BadgeCheck } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [cpassword, setCPassword] = React.useState("");
	const router = useRouter();

	async function onSubmit(event: React.SyntheticEvent) {
		if (password === cpassword) {
			signUp(name, email, password);
			setName("");
			setEmail("");
			setPassword("");
			setCPassword("");
		}
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2 space-y-3">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="fullname">
							Fullname
						</Label>
						<Label className="text-gray-600" htmlFor="password">
							Fullname
						</Label>
						<Input
							id="fullname"
							placeholder="Fullname"
							type="text"
							autoCapitalize="none"
							autoComplete="name"
							autoCorrect="off"
							disabled={isLoading}
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="grid gap-1">
						<Label className="text-gray-600" htmlFor="password">
							Email
						</Label>
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="relative grid gap-1 ">
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Label className="text-gray-600" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{password === cpassword && cpassword !== "" && (
							<BadgeCheck className="absolute text-emerald-500 top-[1.6rem] right-1" />
						)}
					</div>
					<div className="relative grid gap-1">
						<Label className="sr-only" htmlFor="cpassword">
							Confirm Password
						</Label>
						<Label className="text-gray-600" htmlFor="cpassword">
							Confirm Password
						</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							required
							minLength={8}
							value={cpassword}
							onChange={(e) => setCPassword(e.target.value)}
						/>
						{password === cpassword && cpassword !== "" && (
							<BadgeCheck className="absolute text-emerald-500 top-[1.6rem] right-1" />
						)}
						{password !== cpassword && (
							<p className="mb-2 text-red-500">Password does not match</p>
						)}
					</div>

					<Button disabled={isLoading} className="mt-4">
						{isLoading && (
							<Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
						)}
						Sign Up
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="px-2 bg-background text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={handleGoogleSignIn}
			>
				{isLoading ? (
					<Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
				) : (
					<Icons.google className="w-4 h-4 mr-2" />
				)}{" "}
				Google
			</Button>
		</div>
	);
}
