import errorImage from '@/public/error.svg'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (

<div className="grid h-screen px-4 bg-white dark:bg-inherit place-content-center">
  <div className="text-center">
    
<Image src={errorImage} width={300} height={300} className='object-center object-cover w-full' alt='Not found'/>
    <h1
      className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-emerald-400"
    >
      Uh-oh!
    </h1>

    <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
  </div>
</div>
  )
}

