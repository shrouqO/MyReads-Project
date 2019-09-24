import React from 'react'
import './App.css'
import { Route} from 'react-router-dom'
import Shelf from './Component/Shelf'
import SearchB from './Component/SearchButton'
import Search from './Component/Search'
import * as BooksAPI from "./BooksAPI"

class BooksApp extends React.Component {
  constructor(){
   super();
  this.state = {
  books:[]

  }
}
  componentDidMount(){
    BooksAPI.getAll().then(respo => {
      this.setState({books:respo})
    });
  };
updateShelf = (book,shelf) =>{
  BooksAPI.update(book,shelf)
  .then(resp => {
    book.shelf = shelf;
    this.setState(state =>({
      books : state.books.filter(b=>b.id !== book.id).concat([book])
    })

    )
  })
}
  render() {
    return (
    <div className="app">
    <Route exact path={"/"} render={ () => (
   <div className="list-books">
   <div className="list-books-title">
     <h1>MyReads</h1>
   </div>
   <div className="list-books-content">
     <Shelf title='Currently Reading' 
      books={this.state.books.filter(b => b.shelf === 'currentlyReading')}
      updateShelf={this.updateShelf}
     />
     <Shelf title='Want to Read'
     books={this.state.books.filter(b => b.shelf === 'wantToRead')}
     updateShelf={this.updateShelf}
     />
     <Shelf title='Read'
      books={this.state.books.filter(b => b.shelf === 'read')}
      updateShelf={this.updateShelf}
     />
   </div>
   <SearchB/>
 </div>
    )}/>

      <Route exact path={"/search"}render={ () => (
        <Search 
        updateShelf={this.updateShelf}
        books ={this.state.books}/>
   )}/>
     
    </div>
    )
  }
}
export default BooksApp
