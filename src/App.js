import React from 'react';
import './App.css';
import { Form, Button, Table, Modal, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const API_KEY = '29ccffe5';
const URL = "http://www.omdbapi.com/"


class PeixeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {MovieName: '',
                  TableData:[],
                  MovieData: [],
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
                  Awards: '',
                  StarColor: "#828282",
                  InFavorites: false};
      
    this.changeInput = this.changeInput.bind(this);
    this.hideShow = this.hideShow.bind(this)
    this.movieDescription= this.movieDescription.bind(this)
    this.favorites= this.favorites.bind(this)
    this.addFavorites= this.addFavorites.bind(this)      
    this.find= this.find.bind(this)
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
      const MovieData = await resp.json();
      if (MovieData.Response === 'False') {
        alert(MovieData.Error);
        console.log(MovieData.Error)
      }else {
        if (this.state.Favorites.filter((element) => {return element.Title === input.Title}).length == 1){
            this.setState({StarColor : "#ffff00",
                            InFavorites: true})
        }else{
          this.setState({StarColor : "#828282",
                          InFavorites: false})
        }
        this.setState({MovieData: MovieData})
        this.setState({Title: input.Title,
                       Year: input.Year,
                       Poster: input.Poster,
                       Rated: this.state.MovieData.Rated,
                       Released: this.state.MovieData.Released,
                       RunTime: this.state.MovieData.Runtime,
                       Genre: this.state.MovieData.Genre,
                       Director: this.state.MovieData.Director,
                       Writer: this.state.MovieData.Writer,
                       Actors: this.state.MovieData.Actors,
                       Plot: this.state.MovieData.Plot,
                       Language: this.state.MovieData.Language,
                       Country: this.state.MovieData.Country,
                       Awards: this.state.MovieData.Awards,
                       Show: true})
      } 
    }catch (error){
      alert(error.message);
      console.log(error.message);
    }
  }
    
  favorites(){
      this.setState({TableData: this.state.Favorites})
  }

  addFavorites(event){
    
    if (!this.state.InFavorites){
        this.setState({StarColor: "#ffff00",
                        InFavorites: true,
                      Favorites: this.state.Favorites.concat({Title: this.state.Title, Year: this.state.Year, Poster: this.state.Poster})
                       })
    }else{
      this.setState({StarColor: "#828282",
                      InFavorites: false,
                      Favorites: this.state.Favorites.filter((element) => {return element.Title != this.state.Title})
                       })
    }
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
        this.setState({TableData: response.Search})
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
    return( this.state.TableData.map(( value) => {
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
        <Container>
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
              <Row>
                <Col sm={5}>
                  <img src={this.state.Poster} />
                </Col>
                <Col sm={7}>
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
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideShow}> Close </Button>
              <FontAwesomeIcon icon={faStar} onClick={this.addFavorites} style={{ color: this.state.StarColor }}  />
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}
export default PeixeTest;