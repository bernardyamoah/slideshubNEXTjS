import Link from 'next/link'
import { Button } from "@/components/ui/button"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Link href='/dashboard' className='text-center'>  <Button>back</Button></Link>
    {children}
        </>
        )
    }