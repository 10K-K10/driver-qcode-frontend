import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toJpeg } from "html-to-image";
import axios from "axios";
import QRCode from "qrcode.react";
import "./bootstrap.min.css";
import styles from "./Register.module.css";

function Register() {
	// const nav = useNavigate();
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(null);
	const [driver, setDriver] = useState({
		name: "",
		dob: null,
		contact: "",
		address: "",
	});
	const [vehicles, setVehicles] = useState({
		model: "",
		regno: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setDriver((prev) => ({ ...prev, vehicles }));
		if (driver.contact.length !== 10) {
			alert("Contact should be of 10 digts");
			return;
		}
		if (
			driver.name.trim() === "" ||
			driver.address.trim() === "" ||
			driver.contact === "" ||
			driver.dob === null ||
			vehicles.model.trim() === "" ||
			vehicles.regno.trim() === ""
		) {
			alert("ALL FIELDS ARE REQUIRED!");
			return;
		}
		try {
			const { data } = await axios.post("https://driver-qrcode-backend.herokuapp.com/", {
				driver,
			});
			setId(data);
			setIsSuccess(true);
			setTimeout(() => setLoading(false), 1000);
		} catch (error) {
			alert("Already registered");
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setDriver((prev) => ({ ...prev, [name]: value }));
	};

	const handleVehicle = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setVehicles((prev) => ({ ...prev, [name]: value }));
	};

	const downloadImage = () => {
		toJpeg(document.getElementById("card"), { quality: 1.0 }).then(
			(dataUrl) => {
				const link = document.createElement("a");
				link.download = "my-image-name.jpeg";
				link.href = dataUrl;
				link.click();
			}
		);
	};

	return !isSuccess ? (
		<div
			style={{
				maxWidth: "600px",
				width: "100%",
				margin: "auto",
				marginTop: "1.5rem",
			}}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<h3>Driver Details</h3>
				Name:{" "}
				<input
					className='form-control'
					onChange={(e) => handleChange(e)}
					name='name'
					value={driver.name}
					type='text'
				/>{" "}
				DOB:{" "}
				<input
					className='form-control'
					onChange={(e) => handleChange(e)}
					name='dob'
					value={driver.dob}
					type='date'
				/>
				Address:{" "}
				<input
					className='form-control'
					onChange={(e) => handleChange(e)}
					name='address'
					value={driver.address}
					type='text'
				/>
				Contact:{" "}
				<input
					className='form-control'
					onChange={(e) => handleChange(e)}
					name='contact'
					value={driver.contact}
					type='number'
					maxLength={10}
					minLength={10}
				/>
				<hr />
				<h3>Vehicle Details</h3>
				<div id='vehicle'>
					<div>
						Model:{" "}
						<input
							className='form-control'
							onChange={(e) => handleVehicle(e)}
							name='model'
							value={vehicles.model}
							type='text'
						/>
						Reg No:{" "}
						<input
							className='form-control'
							onChange={(e) => handleVehicle(e)}
							name='regno'
							value={vehicles.regno}
							type='text'
						/>
					</div>
				</div>
				<hr />
				<button type='submit'>Submit</button>
			</form>
		</div>
	) : loading ? (
		<>Loading...</>
	) : (
		<section className={styles.section}>
			<div className={styles.card1} id='card'>
				<div className={styles.cardHeader}>
					<h5>Driver Card Identification</h5>
				</div>
				<div className={styles.cardBody}>
					<div className={styles.qrcode}>
						<QRCode
							renderAs='svg'
							value={`https://driver-qcode-frontend.vercel.app/details/${id}`}
						/>
					</div>
					<div className={styles.details}>
						<p>
							Name: <span>{driver.name}</span>
						</p>
						<p>
							DOB: <span>{driver.dob}</span>
						</p>
						<p>
							Address: <span>{driver.address}</span>
						</p>
					</div>
				</div>
			</div>
			<div>
				<button onClick={downloadImage}>Download</button>
			</div>
		</section>
	);
}

export default Register;
