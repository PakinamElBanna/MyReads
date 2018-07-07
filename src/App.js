import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './search.js';
import BookList from './booklist.js';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    toRead: [],
    booksFound: [],
    searching: false
  }

  handleSearchInput = term => {
    this.setState((oldState) => ({
      searching: true
    }))
    BooksAPI.search(term)
    .then((booksFound) => {
      this.setState((oldState) => ({
        booksFound,
        searching: false
      }))
    }
  )
}

resetSearch = () => {
  this.setState({
    searching: false,
    booksFound: []
  })
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
  const { currentlyReading, read, toRead } = this.state;
  return (
    <div className="app">
    <Route exact path="/" render={()=>(
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
      <Link to="/search">Add a book</Link>
      </div>
      </div>
    )} />
    <Route path='/search' render={({history}) => (
      <Search handleSearchInput={this.handleSearchInput} books={this.state.booksFound} searching={this.state.searching} resetSearch={this.resetSearch}/>
    )}
    />
    </div>
  )
}
}

export default BooksApp
