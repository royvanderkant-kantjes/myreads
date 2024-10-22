import { useState } from "react";
import BookGrid from "./BookGrid";

import importedBooks from '../data/searchedbooks.json';
import PropTypes from "prop-types";

const BookSearch = ({onShowSearch, booksOnShelf, onUpdateBook}) => {
    const [searchField,setSearchField] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (event) => {
        
        setSearchField(event.target.value);

        if(event.target.value==="T")
        {
            let updatedBooks = importedBooks.books.map((book) => {
                
                let shelf = "none";
                const onShelf = booksOnShelf.filter((bookOnShelf) => bookOnShelf.id===book.id);
                if(onShelf.length===1) shelf = onShelf[0].shelf;
                return {
                    ...book,
                    shelf: shelf
                };
            });
            setSearchedBooks(updatedBooks);
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    href="#"
                    className="close-search"
                    onClick={onShowSearch}
                >
                    Close
                </a>
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
                <BookGrid books={searchedBooks} onUpdateBook={onUpdateBook}/>
            </div>
        </div>
    )
}

BookSearch.propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
    
};

export default BookSearch;