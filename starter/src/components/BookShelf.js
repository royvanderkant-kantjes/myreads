import PropTypes from "prop-types";
import BookGrid from "./BookGrid";

const BookShelf = ({ title, books, onUpdateBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookGrid books={books} onUpdateBook={onUpdateBook} />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default BookShelf;