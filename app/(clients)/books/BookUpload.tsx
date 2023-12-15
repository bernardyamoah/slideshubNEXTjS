'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {useState } from 'react';
import BookItem from './BookItem';
import { Loader } from './_components/loader';
import coverImg from "@/public/cover_not_found.jpg";
import { Card } from '@/components/ui/card';
import { fetchBookDetails } from '@/lib/functions';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useUserContext } from '@/components/UserContext';
interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  pageCount: number;
  publisher: string;
  categories: string;
  previewLink: string;
  thumbnail: string;
  
}
const BookUpload = () => {
  const { user } = useUserContext();
  const [currentFiles, setCurrentFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [bookData, setBookData] = useState({
    title: '',
    authors: [],
    description: '',
    categories: [],
    publishedDate: '',
    thumbnail: '',
    pageCount: 0,
    publisher: '',
    previewLink: ''

  })
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState<Book | null>(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for the title field
    if (name === 'title') {
      setBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // Clear book if the title becomes empty
      if (value.trim() === '') {
        setBook(null);

      }
    } else {
      // For other fields, update normally
      setBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name; // Get the file name
    setLoading(true)
    setBookData((prevState) => ({ ...prevState, title: fileName }));
    const book = await fetchBookDetails(fileName);

    if (book) {
      setBook(book);
      setBookData({
        title: book.title,
        authors: book.authors,

        description: book.description,
        categories: book.categories,
        publishedDate: book.publishedDate,
        thumbnail: book?.thumbnail || coverImg,
        pageCount: book.pageCount,
        publisher: book.publisher,
        previewLink: book.previewLink,
      });
      setLoading(false)
    }
  };


  const handleSearchClick = async () => {
    // Trigger search when the button is clicked
    setLoading(true);

    try {
      const fetchedBook = await fetchBookDetails(bookData.title);

      if (fetchedBook) {
        console.log('Fetched book details:', fetchedBook);
        setBook(fetchedBook);
        setBookData((prevState) => ({
          ...prevState,
          title: fetchedBook.title,
          authors: fetchedBook.authors || [],
          description: fetchedBook.description,
          categories: fetchedBook.categories || [],
          publishedDate: fetchedBook.publishedDate,
          thumbnail: fetchedBook.thumbnail || coverImg,
          pageCount: fetchedBook.pageCount,
          publisher: fetchedBook.publisher,
          previewLink: fetchedBook.previewLink,
        }));
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle the error as needed (e.g., display an error message)
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event: React.FormEvent) => { 
    event.preventDefault()
    toast.success(<code>{JSON.stringify(bookData, null, 2)}</code>);

  }

  return (
    <>


      <div className='gap-10 flex items-center justify-center flex-col md:flex-row  '>
        {loading ? (
          <Loader />
        ) : (
          book && <BookItem book={bookData} />
        )}
        <Card className='w-full'>
          <form className=' p-4' onSubmit={handleSubmit}>
            <Label>File:</Label>
            <Input type="file" onChange={handleFileChange} />

            <Label htmlFor='label'>Title:</Label>
            <div className="flex gap-3">
              <Input name='title' type="text" value={bookData.title} onChange={handleChange} />
              <Button type="button" className='w-6 h-6' onClick={handleSearchClick}><SearchIcon className='w-5 h-5' /></Button>
            </div>

            <Label htmlFor='authors'>Author:</Label>
            <Input name='authors' type="text" value={bookData.authors} onChange={handleChange} />


            <Label htmlFor='publisher'>Publisher:</Label>
            <Input name='publisher' type="text" value={bookData.publisher} onChange={handleChange} />


            <Label htmlFor='description'>Description:</Label>
            <Textarea name='description' className='h-44' value={bookData.description} onChange={handleChange}></Textarea>


<Button className='mt-6 '>Submit</Button>
          </form>
        </Card>

      </div>

    </>
  );
};

export default BookUpload;