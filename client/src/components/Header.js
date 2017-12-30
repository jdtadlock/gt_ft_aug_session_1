import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
	<header className="row split y-center">
		<div className="column y-center">
			<h3>{ props.logo }</h3>
			<p>{ props.sub }</p>
		</div>
		<nav>
			<button onClick={props.increase}>Increase</button>
			<Link to="/">Home</Link>
			<Link to="/dashboard">Dashboard</Link>
		</nav>
	</header>
)

export default Header;