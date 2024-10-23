import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const BookShelfChanger = ({shelf, onChangeShelf}) => {
    const [value, setValue] = useState();

    const handleChange = (event) => {
        onChangeShelf(event.target.value);
        setValue(event.target.value);        
    }

    useEffect(() => {
        setValue(shelf); 
    }, [shelf]);

    return (
        <div className="book-shelf-changer">
            <select value = {value} onChange={handleChange}>
                <option value="disabled" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default BookShelfChanger;
