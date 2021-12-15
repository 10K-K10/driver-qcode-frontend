import React, { useState } from "react";
import axios from "axios";
import { toJpeg } from "html-to-image";
import QRCode from "qrcode.react";
import "./Details.css";
import styles from "./Register.module.css";

function GetDetails() {
	const [contact, setContact] = useState("");
	const [details, setDetails] = useState(null);

	const downloadImage = () => {
		toJpeg(document.getElementById("card"), { quality: 1.0 }).then(
			(dataUrl) => {
				const link = document.createElement("a");
				link.download = "driver-card.jpeg";
				link.href = dataUrl;
				link.click();
			}
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (contact.length !== 10) {
			alert("Contact should be of 10 digts");
			return;
		}
		const driver = await axios.get(`http://localhost:3500/get/${contact}`);
		console.log(driver.data);
		setDetails(driver.data);
		// document.getElementById("download");
	};

	return (
		<div className='center'>
			{details ? (
				<>
					<div
						className={styles.card1}
						id='card'
						style={{ marginTop: "1rem" }}>
						<div className={styles.cardHeader}>
							<h5>Driver Card Identification</h5>
						</div>
						<div className={styles.cardBody}>
							<div className={styles.qrcode}>
								<QRCode
									renderAs='svg'
									value={`http://localhost:3000/details/${details._id}`}
								/>
							</div>
							<div className={styles.details}>
								<p>
									Name: <span>{details.name}</span>
								</p>
								<p>
									DOB: <span>{details.dob.slice(0, 9)}</span>
								</p>
								<p>
									Address: <span>{details.address}</span>
								</p>
							</div>
						</div>
					</div>
					<span
						className='btn1'
						rel='norefferer'
						onClick={downloadImage}>
						Download Driver Card
					</span>
				</>
			) : (
				<form onSubmit={handleSubmit}>
					<p>Enter your registered contact number: </p>
					<div className='border'>
						<input
							placeholder='Enter Contact Number'
							className='input'
							type='number'
							value={contact}
							onChange={(e) => {
								setContact(e.target.value);
							}}
						/>
						<button className='btn1' type='submit'>
							Submit
						</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default GetDetails;
