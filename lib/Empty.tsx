"use client"
import Image from "next/image";
import { useRouter } from "next/router";
import book from '@/emptybooks.svg'
export function EmptyCampus() {
  const router = useRouter();

  return (
    <section className=" dark:bg-inherit">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="sm:text-3xl md:text-4xl text-center mb-2">
            Oops! Nothing here yet.
          </h1>
          <p className="text-sm md:text-base font-medium text-gray-600 lg:text-2xl dark:text-gray-400">
            Campuses have not been added yet.
          </p>
          <button
            className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold py-2 px-4 mt-6"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
}

export function EmptyBooks() {
  const router = useRouter();

  return (
    <section className=" dark:bg-inherit w-full">
      <div className="flex items-center justify-center">
        <div className="text-center">
			<Image className="object-cover" width={500} height={300} src={book} alt="empty books"/>
          <h1 className="sm:text-3xl md:text-4xl text-center mb-2">
            Oops! Nothing here yet.
          </h1>
          <p className="text-sm md:text-base font-medium text-gray-600 lg:text-2xl dark:text-gray-400">
            There are no books added yet.
          </p>
          <button
            className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold py-2 px-4 mt-6"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
}

export function EmptySlides() {
  const router = useRouter();

  return (
    <section className="">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="sm:text-3xl md:text-4xl text-center mb-2">
            Oops! Nothing here yet.
          </h1>
          <p className="text-sm md:text-base font-medium text-gray-600 lg:text-2xl dark:text-gray-400">
            There are no slides added yet.
          </p>
          <button
            className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold py-2 px-4 mt-6"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
}
