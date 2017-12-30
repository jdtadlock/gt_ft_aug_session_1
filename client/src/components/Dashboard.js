import React, { Component } from 'react';

import axios from 'axios';

class Dashboard extends Component {

    componentDidMount(){
        axios.get("/user")
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
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