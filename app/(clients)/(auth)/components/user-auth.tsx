"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from '@/hooks/use-user';
import { Loader2 } from "lucide-react"
import { account } from "@/appwrite"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = useStore((state) => state.login);
  const loading = useStore((state) => state.loading);
  const setUser = useStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {


    try {
      // Define the redirect URL based on the environment
      const redirectUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://slideshub.vercel.app/dashboard'
          : 'http://localhost:3000/dashboard';

      // Go to OAuth provider login page (Google)
      const result = await account.createOAuth2Session('google', redirectUrl);
      const currentUser = await account.get();
      setUser(currentUser);
      return result
    } catch (error) {
      console.error('Error initiating Google OAuth:', error);
      throw new Error('Error initiating Google OAuth');
    }
  };
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
      await login(email, password, () => {
        router.push('/dashboard')

      });
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 space-y-4">
          <div className="grid gap-1">
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
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={loading} className="mt-4">
            {loading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />

            )}
            Login
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
      <Button variant="outline" type="button" disabled={loading} onClick={handleGoogleSignIn}>
        {loading ? (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Icons.google className="w-4 h-4 mr-2" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}