import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({book, onUpdateBook}) => {
    const onChangeShelf = (shelf) => {
        onUpdateBook({...book, shelf: shelf})
    }
    
    return(
        <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url("${book.imageLinks.thumbnail}")`,
              }}
            ></div>
            <BookShelfChanger 
                shelf={book.shelf}
                onChangeShelf={onChangeShelf}
                />          
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>        
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
};

export default Book;