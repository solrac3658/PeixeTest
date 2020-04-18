import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Button } from 'react-bootstrap';


const API_KEY = '29ccffe5';
const URL = "http://www.omdbapi.com/"
class NameForm extends React.Component {
constructor(props) {
    super(props);
    this.state = {MovieName: ''};
    
     this.changeinput = this.changeinput.bind(this);
     this.buscar= this.buscar.bind(this)
  }


  changeinput(event){
    this.setState({MovieName: event.target.value});
  
  }

  buscar(){
    alert("http://www.omdbapi.com/?s="+this.state.MovieName+"&apikey="+API_KEY);

    fetch(`http://www.omdbapi.com/?s=batman&apikey=29ccffe5`)
    .then(resp => resp)
    .then(resp => resp.json())
    .then(response => {
        if (response.Response === 'False') {
            alert(response.Error);
            console.log(response.Error)
        }
        else {
            console.log(response.Search);
        }

    })
    .catch(({message}) => {
        alert(message);
        console.log(message)
    })

  }

   render() {
    return (
      <div className="App">
        Realizando pruebas
         <Form>
            <Form.Group controlId="formBasictext">
              <Form.Label>Nombre de Película</Form.Label>
              <Form.Control type="text" value ={this.state.MovieName} placeholder="Ingrese Nombre de Película" onChange={this.changeinput} />
            </Form.Group>

            <Button variant="primary" type="button" onClick = {this.buscar}>
              Buscar
            </Button>
        </Form>
      </div>
    );
  }
}
export default NameForm;