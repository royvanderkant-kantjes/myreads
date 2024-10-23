import { useState, useEffect } from "react";
import BookSearch from "./BookSearch";
import BookList from "./BookList";

import * as BooksAPI from "../utils/BooksAPI";
import { Route, Routes } from "react-router-dom";

const BookDashboard = () => {
    const [books, setBooks] = useState([]);

    const deleteBook = (deletedBook) => {
        const update = async () => {
            const res = await BooksAPI.update(deletedBook, deletedBook.shelf);
            setBooks(books.filter(book => book.id !== deletedBook.id));
        };
        update();
    };

    const updateBook = (updatedBook) => {
        let newBookList = books.filter(book => book.id !== updatedBook.id);
        newBookList.push(updatedBook);

        const update = async () => {
            const res = await BooksAPI.update(updatedBook, updatedBook.shelf);
            setBooks(newBookList)
        };

        update();
    }

    const onUpdateBook = (updatedBook) => {
        if (updatedBook.shelf === "none") {
            deleteBook(updatedBook);

            return;
        }
        updateBook(updatedBook);
    }

    useEffect(() => {
        const getBooks = async () => {
            const response = await BooksAPI.getAll();
            setBooks(response);;
        }
        getBooks();
    }, []);

    if (!books) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route 
                path="search"
                element ={
                    <BookSearch
                        onUpdateBook={onUpdateBook}
                        booksOnShelf={books} />
                } 
            />
            <Route 
                path="/"
                element={
                    <BookList
                        onUpdateBook={onUpdateBook}
                        books={books}
                />
                }
            />
        </Routes>
    )
}

export default BookDashboard;