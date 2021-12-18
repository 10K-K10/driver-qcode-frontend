import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { toJpeg } from "html-to-image";
import styles from "./Register.module.css";
import "./Details.css";

function Details() {
	const { id } = useParams();
	const [details, setDetails] = useState(null);

	useEffect(() => {
		const getDetails = async () => {
			const driver = await axios.get(`https://driver-qrcode-backend.herokuapp.com/${id}`);
			setDetails(driver.data);
		};
		getDetails();
	}, [id]);

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

	return details ? (
		<>
			<section className={styles.section} style={{ display: "none" }}>
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
								Name: <span>{details.name}</span>
							</p>
							<p>
								DOB: <span>{details.dob.slice(0, 10)}</span>
							</p>
							<p>
								Address: <span>{details.address}</span>
							</p>
						</div>
					</div>
				</div>
			</section>
			<div style={{ textAlign: "right", paddingRight: "1rem" }}>
				<button onClick={downloadImage}>Download Driver Card</button>
			</div>
			<section className='detailsSection'>
				{/* {console.log(details)} */}
				<header>
					<h1>Driver Details</h1>
					<hr />
					<h3>Name: {details.name}</h3>
				</header>
				<div className='driverdiv'>
					<p>
						DOB: <span>{details.dob.slice(0, 9)}</span>
					</p>
					<p>
						Contact: <span>{details.contact}</span>
					</p>
					<p>
						Address: <span>{details.address}</span>
					</p>
				</div>
				<h1>Vehicles Details</h1>
				<hr />
				<div className='vehiclediv'>
					<p>
						Model: <span>{details.vehicles[0].model}</span>
					</p>
					<p>
						Registration No. :{" "}
						<span>{details.vehicles[0].regno}</span>
					</p>
				</div>
			</section>
		</>
	) : (
		<>
			<p>Loading...</p>
		</>
	);
}

export default Details;
