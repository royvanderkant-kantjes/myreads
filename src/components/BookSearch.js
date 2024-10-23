import { useState } from "react";
import BookGrid from "./BookGrid";
import PropTypes from "prop-types";
import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";

const BookSearch = ({booksOnShelf, onUpdateBook}) => {
    const [searchField,setSearchField] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (event) => {
        
        const searchValue = event.target.value;
        setSearchField(event.target.value);
        setSearchedBooks([]);
        if(searchValue==="") return;

        const search = async () => {
            const response = await BooksAPI.search(event.target.value,10);
            
            if (response.error) return;

            let updatedBooks = response.map((book) => {
                
                let shelf = "none";
                const onShelf = booksOnShelf.filter((bookOnShelf) => bookOnShelf.id===book.id);
                if(onShelf.length===1) shelf = onShelf[0].shelf;
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