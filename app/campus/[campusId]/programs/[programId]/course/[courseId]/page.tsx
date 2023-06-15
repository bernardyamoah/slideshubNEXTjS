'use client'
import { useEffect, useState } from 'react';
import { successMessage, errorMessage, getSlides } from '@/lib/functions';
import Link from 'next/link';
import Loading from '../../../../../../../components/ui/Cloading';
import { Suspense } from 'react';

interface File {
  $id: string;
  name: string;
  url: string;
}

interface Props {
  params: {
    programId: string;
    courseId: string;
  };
}

export default function FilesList({ params }: Props) {
  const { courseId } = params;
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await getSlides();
        successMessage('Successfully fetched files');
        setFiles(response);
      } catch (error) {
        console.log('Error fetching files:', error);
        errorMessage('Failed to fetch files');
      }
      setIsLoading(false); // Set loading state to false after fetching files
    }

    setTimeout(fetchFiles, 6000);
  }, [courseId]);

  return (
    <>
      <main className="card_container">
        <section className="heading-link">
          <h3>Files</h3>
          <p>
            <Link href="/">home</Link> / files
          </p>
        </section>

        <section className="container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            {isLoading ? (
              <Loading /> // Render the loading UI when data is loading
            ) : (
              <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
                <Suspense fallback={<Loading />}>
                  {files.map((file) => (
                    <aside
                      key={file.$id}
                      className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
                    >
                      <a
                        href={file.url}
                        className="card_link group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="text_container">
                          <h3 className="card_heading">{file.name}</h3>
                        </div>
                      </a>
                    </aside>
                  ))}
                </Suspense>
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
