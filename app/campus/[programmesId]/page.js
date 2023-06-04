'use client'
import { useEffect, useState } from 'react';
import { getPrograms } from '@/lib/getPrograms';

export default function CourseList() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await getPrograms();
        setPrograms(response);
      } catch (error) {
        console.log('Error fetching programs:', error);
      }
    }

    setTimeout( fetchPrograms(),10000);
  }, []);

	return (
		<>
			<main className="card_container">
				<section className="heading-link">
					<h3>programmes</h3>
					<p>
						<Link href="/">home</Link> / courses
					</p>
				</section>

				<section
					className="container relative mx-auto flex flex-col items-center pb-10"
					id=""
				>
					<div id="myUL">
						<ul className="program_wrapper pcontain">
						{programs.map((program) => (
							<div key={program.$id} className="bg-white p-4 shadow rounded">
							  <h2 className="text-xl font-bold mb-2">{program.name}</h2>
							  <p className="text-gray-600">{program.description}</p>
							  {/* Render other program data */}
							</div>
						  ))}
						</ul>
					</div>
				</section>
			</main>
		</>
	);
}
