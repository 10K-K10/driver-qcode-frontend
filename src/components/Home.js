import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<main>
			<div className='home'>
				<div className='btn btn-success me-3'>
					<Link to='/register'>REGISTER</Link>
				</div>
				<div className='btn btn-info'>
					<Link to='/getdetails'>GET DETAILS</Link>
				</div>
			</div>
		</main>
	);
}

export default Home;
