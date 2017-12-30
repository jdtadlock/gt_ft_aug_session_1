import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Signin from './components/Signin';

window.axios = axios;

// let someObject = {
//   blah: 'blah'
// }

// function Person(name, age) {
//   this.name = name; 
//   this.age = age;

//   this.myMethod = function() {

//   }
// }

// var jd = new Person('JD', 38);

class App extends Component {
  constructor() {
    super();

    this.state = {
      logo: 'React Something Else',
      sub_text: 'An Awesome Experience!',
      count: 0,
      gifs: []
    }
  }

  increaseCounter = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  getGifs() {
    let key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';

    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${key}&q=batman&limit=10`)
      .then(res => {
        console.log(res.data.data);
        this.setState({
          gifs: res.data.data
        });

        // console.log(res.data);
      });
  }

  componentDidMount() {
    this.getGifs();
  }

  render() {
    // let div = document.createElement('div');
    // let childEl = document.createElement('header');
    // childEl.innerText = 'Title';
    return (
      <div>        
        <Header 
          logo={this.state.logo} 
          sub={this.state.sub_text}
          increase={this.increaseCounter} />

        <h1>Count: { this.state.count }</h1>

        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/dashboard" render={() => (
          <Dashboard gifs={this.state.gifs} />
        )} />
      </div>
    );
  }
}
const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

const PrivateRoute = ({render:Render,  ...rest}) => {
    return(
        <Route
            exact
            {...rest}
            render = {(props) => isAuthenticated
            ? <Render/>
            :  <Redirect to = {{ pathname: "/"}}/> }
            />
    );
};

export default App;
