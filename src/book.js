import React from 'react';

const Book = (props) => (
  <div className="book">
  <div className="book-top">
  {props.cover? (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.cover.thumbnail})` }}></div>): (<div className="book-cover book-cover-title" style={{ width: 128, height: 193}}>{props.title}</div>)}
  <div className="book-shelf-changer">
  <select>
  <option value="move" disabled>Move to...</option>
  <option value="currentlyReading">Currently Reading</option>
  <option value="wantToRead">Want to Read</option>
  <option value="read">Read</option>
  <option value="none">None</option>
  </select>
  </div>
  </div>
  <div className="book-title">{props.title}</div>
  {props.authors && props.authors.length > 0 && (
    <div className="book-authors">{props.authors.length > 1? (<ul className="authors-list">{(props.authors.map(author => (<li key={author}>{author}</li>)))}</ul>):(<p>{props.authors[0]}</p>)}</div>
  )}
  </div>
)
export default Book;
