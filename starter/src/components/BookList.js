import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const ShelfList = [{title: "Currently Reading",shelf:"currentlyReading"},{title: "Want to Read", shelf:"wantToRead"},{title: "Read", shelf:"read"}];

const BookList = ({books, onUpdateBook}) => {
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                {
                    ShelfList.map(shelf => 
                        <BookShelf 
                            key={shelf.shelf}
                            title={shelf.title} 
                            books={books.filter(book=> book.shelf===shelf.shelf)}
                            onUpdateBook={onUpdateBook}
                        />
                    )
                }
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