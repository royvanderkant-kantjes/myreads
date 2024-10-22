import { useState, useEffect } from "react";
import BookSearch from "./BookSearch";
import BookList from "./BookList";

import importedBooks from '../data/books.json';

const BookDashboard = () => {
    const [showSearchPage, setShowSearchpage] = useState(false);
    const [books, setBooks] = useState([]);

    const onShowSearch = () => {
        setShowSearchpage(!showSearchPage);
    }

    const deleteBook = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId));
    };

    const updateBook = (updatedBook) => {
        let newBookList = books.filter(book => book.id !== updatedBook.id);
        newBookList.push(updatedBook);
        setBooks(newBookList)
    }

    const onUpdateBook = (updatedBook) => {
        if (updatedBook.shelf === "none") {
            deleteBook(updatedBook.id);
            return;
        }
        updateBook(updatedBook);
    }

    useEffect(() => {
        setBooks(importedBooks.books);
    }, []);

    if (!books) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showSearchPage ? (
                <BookSearch
                    onShowSearch={onShowSearch}
                    onUpdateBook={onUpdateBook}
                    booksOnShelf={books}
                />
            ) : (
                <BookList
                    onShowSearch={onShowSearch}
                    onUpdateBook={onUpdateBook}
                    books={books}
                />
            )}
        </>

    )
}

export default BookDashboard;