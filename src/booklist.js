import React, { Component } from 'react';
import Book from './book.js';

class BookList extends Component {
  render(){
    const { title, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
                  <li key={book.id}>
                    <Book title={book.title} authors={book.authors} shelf={book.shelf} cover={book.imageLinks.thumbnail}/>
                  </li>
                ))
            }
          </ol>
        </div>
      </div>
    )
  }
}
export default BookList;
