'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import BookItem from './BookItem';
import { Loader } from './_components/loader';
import coverImg from "@/public/cover_not_found.jpg";
interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  previewLink: string;
  thumbnail: string;
  searchInfo: string;
}
const BookUpload = () => {
  const [bookData, setBookData] = useState({
    title: 'Avatar',
    authors: [],
    edition: '',
    isbn: '',
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

  const API_KEY = 'AIzaSyA_D0DfjabFQ8QWqnuh8f8G6TY6DU-_YfI';

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setBookData(prevState => ({ ...prevState, [name]: value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: name === 'authors' ? value.split(',') : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name; // Get the file name
    setBookData(prevState => ({ ...prevState, title: fileName }))

    const API_ENDPOINT = `https://www.googleapis.com/books/v1/volumes?q=${fileName}&key=${API_KEY}`;
    setLoading(true)
    const bookDataResponse = await fetch(API_ENDPOINT);
    console.log(bookDataResponse.body);

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (bookDataResponse.ok) {
        const bookData = await bookDataResponse.json();
        console.log("🚀  ~ bookData:", bookData.items[0])
        const { id, volumeInfo } = bookData.items[0];
        const { title, authors, publishedDate, publisher, description, pageCount, categories, previewLink, imageLinks, searchInfo } = volumeInfo;
        const thumbnail = imageLinks?.thumbnail || coverImg;
        const book = {
          id,
          title,
          authors,
          publishedDate,
          description,
          pageCount,
          publisher,
          categories,
          previewLink,
          thumbnail,
          searchInfo,
        };

        setBook(book);
        setBookData(prevState => ({
          ...prevState,
          title: title,
          authors: authors, // Assuming authors is an array and we're taking the first author
          description: description,
          publishedDate: publishedDate,
          publisher: publisher,
          pageCount: pageCount,
          categories: categories,
          previewLink: previewLink,
          thumbnail: thumbnail,
          searchInfo: searchInfo,

        }));
        setLoading(false)
      } else {
        console.error('Failed to fetch book data');
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='gap-10 flex items-center justify-center flex-col md:flex-row  '>
        {book && <BookItem book={book} />}
        <form className='flex-1 max-w-2xl rounded-md  border p-4'>
          <Label>File:</Label>
          <Input type="file" onChange={handleFileChange} />

          {loading ? (
            <Loader />
          ) : book ? (
            <>
              <Label>Title:</Label>
              <Input type="text" value={bookData.title} onChange={handleChange} />

              <Label>Author:</Label>
              <Input type="text" value={bookData.authors} onChange={handleChange} />

              <Label>Edition:</Label>
              <Input type="text" value={bookData.edition} onChange={handleChange} />

              <Label>ISBN:</Label>
              <Input type="text" value={bookData.isbn} onChange={handleChange} />

              <Label>Publisher:</Label>
              <Input type="text" value={bookData.publisher} onChange={handleChange} />

              <Label>Publication Date:</Label>
              <Input type="date" value={bookData.publishedDate} onChange={handleChange} />

              <Label>Description:</Label>
              <Textarea className='max-h-44' value={bookData.description} onChange={handleChange}></Textarea>


            </>
          ) : null}

        </form>

      </div>

    </>
  );
};

export default BookUpload;