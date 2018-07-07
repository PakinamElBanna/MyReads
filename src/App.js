import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './search.js';
import BookList from './booklist.js';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    toRead: [],
    /**
    * TODO: Instead of using this state variable to keep track of which page
    * we're on, use the URL in the browser's address bar. This will ensure that
    * users can use the browser's back and forward buttons to navigate between
    * pages, as well as provide a good URL they can bookmark and share.
    */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const currentlyReading = [];
      const toRead = [];
      const read = [];
      for (let book of books) {
        var shelf = book.shelf;
        switch(shelf) {
          case 'read': {
            read.push(book);
            break;
          }
          case 'wantToRead': {
            toRead.push(book);
            break;
          }
          case 'currentlyReading': {
            currentlyReading.push(book);
            break;
          }
          default: {
            break;
          }
        }
      }
      this.setState(oldState => ({
        currentlyReading,
        toRead,
        read,
        books
      }))
    })
  }
  render() {
    console.log(this.state.books)
    const { currentlyReading, read, toRead } = this.state;
    return (
      <div className="app">
      {this.state.showSearchPage ? (
        <Search />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookList title={'Currently Reading'} books={currentlyReading}/>
            <BookList title={'Want to Read'} books={toRead} />
            <BookList title={'Read'} books={read} />
          </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
        </div>
      )}
      </div>
    )
  }
}

export default BooksApp
