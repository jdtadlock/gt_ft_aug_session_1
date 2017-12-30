import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';


class Signin extends Component {

    constructor() {
        super();

        this.state = {};
    }

    getValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };


    sendData = (event) => {
        event.preventDefault();

        axios.post('/signin', this.state)
            .then((data) => {
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                this.props.history.push('/dashboard');
            })
            .catch((err) => {
                // Not signed
                console.log("Error Happened");
                console.log(err);
            });
    };

    render() {

        return (
            <div>

                <form>
                    <input
                        type="text"
                        name="username"
                        onChange={this.getValues}/> <br/>


                    <input
                        type="password"
                        name="password"
                        onChange={this.getValues}/> <br/>

                    <button onClick={this.sendData}>Signin</button>
                </form>

                <Link to = '/'> <button>Go to Signin</button> </Link>

            </div>
        );
    }

}

export default Signin;