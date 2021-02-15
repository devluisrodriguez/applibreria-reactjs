import React from 'react';
import './App.css';
import Menu from "./Menu";
import List from "./List";

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      books:[
        {id:0, rating:4, title:'Primeros Pasos 1', image:'Libro001.jpg'},
        {id:1, rating:3, title:'Corriendo 4', image:'Libro002.jpg'},
        {id:2, rating:5, title:'Alborada - Primer Curso', image:'Libro003.jpg'},
        {id:3, rating:4, title:'Jaimito y Julieta - 4to Grado Primaria', image:'Libro004.jpg'},
        {id:4, rating:3, title:'My Alphabet - Coquito', image:'Libro005.jpg'},
        {id:5, rating:5, title:'Matematicas - 1 primaria - Santilla', image:'Libro006.jpg'},
        {id:6, rating:5, title:'Matematicas - 2 primaria - Santilla', image:'Libro007.jpg'},
        {id:7, rating:4, title:'Matematicas - 3 primaria - Santilla', image:'Libro008.jpg'},
        {id:8, rating:5, title:'Ciencias Naturales - 3 primaria - Santilla', image:'Libro009.jpg'},
        {id:9, rating:4, title:'Lenguaje y Comunicación - 4to primaria - Santilla', image:'Libro010.jpg'},
        {id:10, rating:5, title:'Abya Yalita - Tomo I - 5to primearia', image:'Libro011.jpg'},
        {id:11, rating:4, title:'Kid`s Box - 1ro primaria - Cambridge', image:'Libro012.jpg'}
      ],
      copyBooks: []
    };
  }

  componentDidMount(){
    this.initBooks();
  }

  initBooks = () =>{
    this.setState((state,props) => ({
      copyBooks: [... state.books]
    })
    );
  }

  onAdd = (item) =>{
    let temp = [... this.state.books]
    const id = temp[temp.length-1].id + 1;
    item['is'] = id;
    temp.push(item);

    this.setState({books: [... temp]});
    this.initBooks();
  }

  onSearch = (query) =>{
    if(query === ''){
//      this.setState({copyBooks: [... this.state.books]});
      this.initBooks();
    }else{
      const temp = [... this.state.books];
      let res = [];

      temp.forEach(item => {
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
        this.setState({copyBooks: [... res]});
      });
    }
  }

  onUpdateRating = (item) =>{
    var temp = [... this.state.books];
    const index = temp.findIndex(x => x.id === item.id);

    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [... temp]});
    this.initBooks();
  }

  onRemove = (id) =>{
    var temp = [... this.state.books];
    const res = temp.filter(item => item.id != id);

    this.setState({books: [... res]});
    this.initBooks();
  }

  render (){
    return(
      <div className="app">
        <Menu title="Libreria" onAdd={this.onAdd} onsearch={this.onSearch} />
        <List 
          items={this.state.copyBooks} 
          onupdaterating={this.onUpdateRating}
          onremove={this.onRemove} />
      </div>
    );
  }
}

export default App;
