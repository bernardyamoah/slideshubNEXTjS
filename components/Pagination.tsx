import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center mt-6">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`}>
          <a className="px-4 py-2 text-blue-500 hover:text-blue-700">Previous</a>
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <Link href={`/?page=${i + 1}`} key={i}>
          <a
            className={`px-4 py-2 ml-2 ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-blue-500 hover:text-blue-700'
            }`}
          >
            {i + 1}
          </a>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`}>
          <a className="px-4 py-2 ml-2 text-blue-500 hover:text-blue-700">Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
