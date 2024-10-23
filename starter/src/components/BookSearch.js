import { useState } from "react";
import BookGrid from "./BookGrid";
import PropTypes from "prop-types";
import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";

const BookSearch = ({ booksOnShelf, onUpdateBook }) => {
    const [searchField, setSearchField] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (event) => {
        // With every key stroke the API is called (maybe not preferable for a production environment)
        const searchValue = event.target.value;
        setSearchField(event.target.value);
        setSearchedBooks([]);
        if (searchValue === "") return;

        const search = async () => {
            const response = await BooksAPI.search(event.target.value, 20);

            if (response.error) return;

            let updatedBooks = response.map((book) => {
                let shelf = "none";
                // If a book in the searchlist, is also on the booksOnshelfList then determine the right shelf 
                const onShelf = booksOnShelf.filter((bookOnShelf) => bookOnShelf.id === book.id);
                // Filter with id always returns 0 or 1 result
                if (onShelf.length === 1) shelf = onShelf[0].shelf;
                // add shelf to book object
                return {
                    ...book,
                    shelf: shelf
                };
            });
            setSearchedBooks(updatedBooks);
        };
        search();
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" />
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        name="search"
                        onChange={(event) => handleChange(event)}
                        value={searchField}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <BookGrid books={searchedBooks} onUpdateBook={onUpdateBook} />
            </div>
        </div>
    )
}

BookSearch.propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
};

export default BookSearch;