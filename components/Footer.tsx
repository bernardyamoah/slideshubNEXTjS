'use client'
import Link from 'next/link'
import { Card } from './ui/card'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <>
            <Card className="bottom-0 absolute w-full p-4">
            
                    
                    <p className="footer_copyright">
                        © <span >{currentYear}</span> BartLabs, Inc. All rights reserved.
                    </p>
                
            </Card>

        </>
    )
}
