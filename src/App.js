import React from 'react';
import './App.css';
import { Form, Button, Table, Modal, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip";


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
        if (this.state.Favorites.filter((element) => {return element.Title === input.Title}).length === 1){
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

  getHeader(){
    return (
      <>
        <th> Poster </th>
        <th> Title </th> 
        <th> Year </th>
      </>
    );
  }
   
  getRowsData(){ 
    return( this.state.TableData.map(( value) => {
      return (
        <tr onClick={() => this.movieDescription(value)}>
          <td> <img class="image_find" src={value.Poster} /> </td>
          <td align="center"> {value.Title} </td> 
          <td> {value.Year} </td> 
        </tr>) 
      })
    );
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Form>
            <Row>
              <Col lg={10}>
                <Form.Group controlId="formBasictext">
                  <Form.Control type="text" value ={this.state.MovieName} placeholder="Ingrese Nombre de Película" onChange={this.changeInput}/>
                </Form.Group>
              </Col>
              <Col lg={1}> <Button variant="outline-success"  type="button" onClick={this.find}> Buscar </Button> </Col>
              <Col lg={1}> <Button variant="outline-warning" type="button" onClick={this.favorites}> Favoritos </Button> </Col>
            </Row>
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
          
          <Modal size="lg" show={this.state.Show}>
            <Modal.Header>
              <Modal.Title> {this.state.Title} </Modal.Title>
              <FontAwesomeIcon id="button_favorite"  data-tip="Favoritos" icon={faStar} onClick={this.addFavorites} style={{color: this.state.StarColor}}/>
              <ReactTooltip />              
            </Modal.Header>
            <Modal.Body> 
              <Row>
                <Col lg={5}> <img id="image_modal" src={this.state.Poster} /> </Col>
                <Col lg={7}>
                  <h6> <b> Plot: </b> </h6> <p> {this.state.Plot} </p>  
                  <h6><b> Director: </b> </h6> <p> {this.state.Director} </p> 
                  <h6>  <b> Actors: </b> </h6> <p> {this.state.Actors} </p>
                  <h6><b> Writer: </b> </h6> <p> {this.state.Writer} </p>
                </Col>
              </Row>
              <Row> 
                <Col lg={2}> <br/> <b> Rated: </b> <p>{this.state.Rated} </p> </Col> 
                <Col lg={2}> <br/> <b> Released: </b> <p>{this.state.Released} </p> </Col>
                <Col lg={2}> <br/> <b> Duration: </b> <p>{this.state.RunTime} </p> </Col> 
                <Col lg={2}> <br/> <b> Genere: </b> <p>{this.state.Genre} </p> </Col> 
                <Col lg={2}> <br/> <b> Language: </b> <p>{this.state.Language} </p> </Col> 
                <Col lg={2}> <br/> <b> Country: </b> <p>{this.state.Country} </p> </Col> 
              </Row>
              <b> Awards: </b> <p>{this.state.Awards} </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={this.hideShow}> Close </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}
export default PeixeTest;