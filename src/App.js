import React from 'react';
import './App.css';
import { Form, Button, Table, Modal } from 'react-bootstrap';


const API_KEY = '29ccffe5';
const URL = "http://www.omdbapi.com/"


class PeixeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {MovieName: '',
                  response:[],
                  responset: [],
                  Favorites: [],
                  Show: false,
                  Title: '',
                  Year: '',
                  Poster: '',
                  Rated: '',
                  Released: '',
                  RunTime: '',
                  Genre: '',
                  Director: '',
                  Writer: '',
                  Actors: '',
                  Plot: '',
                  Language: '',
                  Country: '',
                  Awards: '' };
      
    this.changeInput = this.changeInput.bind(this);
    this.hideShow = this.hideShow.bind(this)
    this.find= this.find.bind(this)
    this.favorites= this.favorites.bind(this)
    this.movieDescription= this.movieDescription.bind(this)
    this.addFavorites= this.addFavorites.bind(this)   
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
  }


  changeInput(event) {
    this.setState({MovieName: event.target.value});
  }

  hideShow() {
      this.setState({Show: false});
  }

  async movieDescription(input) {
    try {
      const params = "?t="+input.Title+"&apikey="+API_KEY;
      const resp = await fetch(URL+params);
      const responset = await resp.json();
      if (responset.Response === 'False') {
        alert(responset.Error);
        console.log(responset.Error)
      }else {
        this.setState({responset: responset})
        this.setState({Title: input.Title,
                       Year: input.Year,
                       Poster: input.Poster,
                       Rated: this.state.responset.Rated,
                       Released: this.state.responset.Released,
                       RunTime: this.state.responset.Runtime,
                       Genre: this.state.responset.Genre,
                       Director: this.state.responset.Director,
                       Writer: this.state.responset.Writer,
                       Actors: this.state.responset.Actors,
                       Plot: this.state.responset.Plot,
                       Language: this.state.responset.Language,
                       Country: this.state.responset.Country,
                       Awards: this.state.responset.Awards,
                       Show: true})
      } 
    }catch (error){
      alert(error.message);
      console.log(error.message);
    }
  }
    
  favorites(){
      this.setState({response: this.state.Favorites})
  }

  addFavorites(){
    this.setState({
        Favorites: this.state.Favorites.concat({Title: this.state.Title, Year: this.state.Year, Poster: this.state.Poster})
    })
  }

  deleteFavorites(){

  }

  async find(){
    try {
      const params = "?s="+this.state.MovieName+"&apikey="+API_KEY;
      const resp = await fetch(URL+params);
      const response = await resp.json();
      if (response.Response === 'False') {
        alert(response.Error);
        console.log(response.Error)
      }else {
        this.setState({response: response.Search})
      } 
    }catch (error){
      alert(error.message);
      console.log(error.message);
    }
  }

   
  getHeader = function(){
    return (
      <>
        <th> Title </th>
        <th> Year </th> 
        <th> Poster </th>
      </>
    );
  }
   
  getRowsData = function(){ 
    return( this.state.response.map(( value) => {
      return (
        <tr onClick={() => this.movieDescription(value)}>
          <td> {value.Title} </td> 
          <td> {value.Year} </td>
          <td> <img src={value.Poster} /> </td> 
        </tr>) 
      })
    );
  }

  render() {
    return (
      <div className="App">
        <Form>
          <Form.Group controlId="formBasictext">
            <Form.Label>Nombre de Película</Form.Label>
            <Form.Control type="text" value ={this.state.MovieName} placeholder="Ingrese Nombre de Película" onChange={this.changeInput} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={this.find}> Buscar </Button>
          <Button variant="primary" type="button" onClick={this.favorites}> favoritos </Button>
        </Form>
        <div>
          <Table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
          </Table>
        </div>
        <Modal show={this.state.Show}>
          <Modal.Header closeButton onClick={this.hideShow}>
              <Modal.Title> {this.state.Title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> Year: {this.state.Year}</p>
            <img class="center" src={this.state.Poster} />
            <p> Rated: {this.state.Rated} </p>
            <p> Released: {this.state.Released} </p>
            <p> Duration: {this.state.RunTime} </p>
            <p> Genere: {this.state.Genre} </p>
            <p> Director: {this.state.Director} </p>
            <p> Writer: {this.state.Writer} </p>
            <p> Actors: {this.state.Actors} </p>
            <p> Plot: {this.state.Plot} </p>
            <p> Language: {this.state.Language} </p>
            <p> Country: {this.state.Country} </p>
            <p> Awards: {this.state.Awards} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideShow}> Close </Button>
            <Button variant="primary" onClick={this.addFavorites}> Agregar favoritos </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default PeixeTest;