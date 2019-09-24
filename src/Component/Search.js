import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {search} from '../BooksAPI'
import Book from '../Component/Book';
class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:'',
      books:[]
    };
  } 
  handleChange =async e =>{
    try{
      const query = e.target.value;
      this.setState({query});
      if(query.trim()){

        const results=await search (query);
            if(results.error){
              this.setState({books:[]});
            }else{
              this.setState({books:results});
            }
            }else{
              this.setState({books:[]})
            }
    }catch (error){
          console.log(error)
    }
  }
   
    render() { 
        return ( 
                <div className="search-books">
                  <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                      <input
                      type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.books.length > 0 &&
                    this.state.books.map(book => {
                      const fb = this.props.books.find(
                        sb => sb.id === book.id
                      );
                      if (fb){
                        book.shelf = fb.shelf;
                      }
                      else{
                        book.shelf = 'none';
                      }
                      return (
                        <Book
                         updateShelf={this.props.updateShelf}
                          key={book.id}
                          book={book}
                          />
                      )
                    })}
                    </ol>
                  </div>
                </div>
         );
    }
}
export default Search;