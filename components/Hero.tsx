
import Image from 'next/image'

import heroimage3 from '/assets/hero-image-3.png'
const Hero = () => {
	return (
		<>
			 <section className="flex items-center justify-center py-10">
      <div className="mx-auto space-y-4 text-center max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700">
          Welcome to Slideshub
        </h2>
        
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto lg:text-lg">
        Slideshub is your ultimate online resource for downloading and printing lecture slides and books. Gain easy access to a wide range of high-quality educational content in just a few clicks.


        </p>
        <div className="relative w-full h-96">
          <Image
            className="object-cover object-center w-full h-full"
            src={heroimage3}
			width={500}
			height={800}
            alt="Online Learning"
       
          />
        </div>
      </div>
    </section>



		</>
	)
}

export default Hero

