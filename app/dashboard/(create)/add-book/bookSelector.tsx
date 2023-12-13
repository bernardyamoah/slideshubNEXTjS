const BookSelector = ({ books, onSelect }) => {
    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select a Book</option>
            {books.map((book) => (
                <option key={book.id} value={book.title}>
                    {book.title}
                </option>
            ))}
        </select>
    );
};

export default BookSelector;