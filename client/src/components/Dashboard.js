import React, { Component } from 'react';

class Dashboard extends Component {
	render() {
		return(
			<div>
				<h1>Dashboard</h1>

				<div className="gifs row wrap">
					{this.props.gifs.map((gif, i) => (
						<div key={i} className="gif" style={{backgroundImage: `url(${gif.images.downsized.url})`}}></div>
						// <div key={i} className="gif">
						// 	<img src={gif.images.downsized.url} alt=""/>
						// </div>
					))}
				</div>
			</div>
		)
	}
}

export default Dashboard;