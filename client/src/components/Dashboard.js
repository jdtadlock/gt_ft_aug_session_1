import React, { Component } from 'react';
import helpers from '../helpers/helpers';
import axios from 'axios';

class Dashboard extends Component {

  componentDidMount() {
  	console.log(helpers.isAuthenticated());
  	if ( !helpers.isAuthenticated() ) 
			this.props.history.push('/');
      // axios.get("/user")
      //     .then((data) => {
      //         console.log(data);
      //     })
      //     .catch((err) => {
      //         console.log(err);
      //     });
  }

	render() {
		return(
			<div>
				<h1>Dashboard</h1>

				<div className="gifs row wrap">

				</div>
			</div>
		)
	}
}

export default Dashboard;