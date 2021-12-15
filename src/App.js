import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Register from "./components/Register";
import Success from "./components/Success";
import GetDetails from "./components/GetDetails";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/register/success' element={<Success />} />
				<Route path='/details/:id' element={<Details />} />
				<Route path='/getdetails' element={<GetDetails />} />
				<Route path='/' element={<Home />} />
				<Route path='*' element={<h1>404 Not Found</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
