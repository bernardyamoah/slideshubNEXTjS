import Link from 'next/link'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Navbar />
        <Link href='/dashboard' className='text-center'>  <Button>back</Button></Link>
    {children}
        </>
        )
    }