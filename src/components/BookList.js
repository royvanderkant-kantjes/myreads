import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const BookList = ({books, onUpdateBook}) => {
    return(
        <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf 
                    title="Currently Reading" 
                    books={books.filter(book=> book.shelf==="currentlyReading")}
                    onUpdateBook={onUpdateBook}
                    />
                <BookShelf 
                    title="Want to Read" 
                    books={books.filter(book=> book.shelf==="wantToRead")}
                    onUpdateBook={onUpdateBook}
                    />
                <BookShelf 
                    title="Read" 
                    books={books.filter(book=> book.shelf==="read")}
                    onUpdateBook={onUpdateBook}
                    />
            </div>
        </div>
        <div className="open-search">
            <Link to="/search" />
        </div>
    </div>
    )
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
    
};

export default BookList;