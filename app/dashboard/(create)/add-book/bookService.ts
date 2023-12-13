import axios from 'axios';

const OPEN_LIBRARY_SEARCH_API = 'http://openlibrary.org/search.json';
const OPEN_LIBRARY_COVERS_API = `http://covers.openlibrary.org/b/ISBN/`;

const searchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${OPEN_LIBRARY_SEARCH_API}?title=${encodeURIComponent(title)}`);
    return response.data.docs.map((book) => ({
      key: book.key,
      title: book.title,
    }));
  } catch (error) {
    console.error('Error searching books by title:', error);
    return [];
  }
};

const getBookCover = (coverId) => `${OPEN_LIBRARY_COVERS_API}${coverId}-L.jpg`;

export { searchBooksByTitle, getBookCover };