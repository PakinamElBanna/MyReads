import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book.js';

class Search extends Component {
  state = {
    term: ''
  }

  handleInput = event => {
    const term = event.target.value;
    this.setState((oldState) => ({
      term
    }))
    if(term.length > 0 ) {
      this.props.handleSearchInput(term)
    }
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  loadingSearchResults = () => {
    return this.props.searching && this.state.term.length > 0
  }

  noResults = () => {
    return !this.props.searching && this.state.term.length > 0 && !this.props.books.length > 0
  }

  booksFound = () => {
    return !this.props.searching && this.props.books.length > 0 && this.state.term.length > 0
  }

  render() {
    const LOADING = <div className='search-result'><p>Searching ..</p></div>
    const NO_RESULTS = <div className='search-result'><p>No results</p></div>
    const EMPTY = <div className='search-result'><p>Enter a search term</p></div>
    let results;
    if(this.loadingSearchResults()) {
      results = LOADING;
    } else if (this.booksFound()) {
      results = <ol className="books-grid">
      {this.props.books.map(book => (<li key={book.id}>
        <Book book={book} getAllBooks={this.props.getAllBooks}/>
        </li>
      ))}
      </ol>
    } else if (this.noResults()) {
      results = NO_RESULTS;
    } else {
      results = EMPTY;
    }
    return (
      <div className="search-books">
      <div className="search-books-bar">
      <Link to="/" className="close-search">back</Link>
      <div className="search-books-input-wrapper">
      <input type="text" placeholder="Search by title or author" value={this.state.term} onChange={this.handleInput}/>
      </div>
      </div>
      <div className="search-books-results">
      {results}
      </div>
      </div>
    )
  }
}
export default Search;
