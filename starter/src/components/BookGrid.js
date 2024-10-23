import PropTypes from "prop-types";
import Book from "./Book";

const BookGrid = ({ books, onUpdateBook }) => {
    return (
        <>
            {books &&
                <ol className="books-grid">
                    {books.map(book => <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />)}
                </ol>
            }
        </>
    )
}

BookGrid.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
    
};

export default BookGrid;