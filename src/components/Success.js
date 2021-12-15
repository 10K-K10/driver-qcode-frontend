import React from "react";
import { Link } from "react-router-dom";

function Success() {
	return (
		<div>
			<h1>Driver registered Successfully</h1>
			<Link to={"/"}>Go Home</Link>
		</div>
	);
}

export default Success;
