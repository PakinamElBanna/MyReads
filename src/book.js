import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  state = {
    book: {},
    shelf: ""
  };

  changeShelf = (event, book) => {
    event.preventDefault();
    const shelf = event.target.value;
    this.setState(oldState => ({
      shelf
    }));
    BooksAPI.update(book, shelf).then(book => {
      this.props.getAllBooks();
    });
  };

  componentDidMount = () => {
    this.setState(oldState => ({
      book: this.props.book,
      shelf: this.props.book.shelf
        ? this.props.book.shelf
        : this.getShelf(this.props.book.id)
    }));
  };

  getShelf(id) {
    BooksAPI.get(id).then(book => {
      this.setState(oldState => ({
        shelf: book.shelf
      }));
    });
  }

  render() {
    const { book, shelf } = this.state;
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
          ) : (
            <div
              className="book-cover book-cover-title"
              style={{ width: 128, height: 193 }}
            >
              {book.title}
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              onChange={event => this.changeShelf(event, book)}
              value={shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.length > 0 && (
            <div className="book-authors">
              {book.authors.length > 1 ? (
                <ul className="authors-list">
                  {book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
              ) : (
                <p>{book.authors[0]}</p>
              )}
            </div>
          )}
      </div>
    );
  }
}
export default Book;
