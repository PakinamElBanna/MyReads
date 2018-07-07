import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './book.js';

class Search extends Component {
  state = {
    term: '',
    books: []
  }

  handleInput = event => {
    const term = event.target.value;
    this.setState((oldState) => ({
      term
    }))
    if(this.state.term.length > 0) {
      BooksAPI.search(this.state.term)
              .then((books) => {
                this.setState((oldState) => ({
                  books
                }))
              })
    }

  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search">back</Link>
          { /*<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.term} onChange={this.handleInput}/>

          </div>
        </div>
        <div className="search-books-results">
          {this.state.books && this.state.books.length > 0 && this.state.term.length > 0?
            (<ol className="books-grid">
                {this.state.books.map(book => (
                  <li key={book.id}>
                    <Book title={book.title} cover={book.imageLinks} shelf={book.shelf} authors={book.authors}/>
                  </li>
                ))}
              </ol>)
              :this.state.term.length > 0?
          (<div>
            <p>No results found</p>
          </div>)
        :
      null}
        </div>
      </div>
    )
  }
}
export default Search;
