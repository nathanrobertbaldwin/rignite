import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";


function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [admin, setAdmin] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {

			if(admin) {
				setAdmin("True")
			} else {
				setAdmin("False")
			}

			const data = await dispatch(signUp(username, email, firstname, lastname, address, city, state, zipcode, admin, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id='signup-container'>
			<h1 id='signup-title'>Sign Up</h1>
			<hr id='signup-hr'/>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div id='signup-main-container'>
					<div id='user-info-container'>
						<h2 id='signup-subtitle'>
							User Info
						</h2>
						<div id='signup-email-container'>
							<label>
								Email
							</label>
								<input
									type="text"
									value={email}
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
						</div>
						<div id='signup-username-container'>
							<label>
								Username
							</label>
								<input
									type="text"
									value={username}
									placeholder="Username"
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
						</div>
						<div id='signup-firstname-container'>
							<label>
								Firstname
							</label>
								<input
									type="text"
									value={firstname}
									placeholder="Firstname"
									onChange={(e) => setFirstname(e.target.value)}
									required
								/>
						</div>
						<div id='signup-lastname-container'>
							<label>
								Lastname
							</label>
								<input
									type="text"
									value={lastname}
									placeholder="Lastname"
									onChange={(e) => setLastname(e.target.value)}
									required
								/>
						</div>
					</div>
					<div id='middle-border'>
					</div>
					<div id='shipping-info-container'>
						<h2 id='signup-subtitle'>
							Shipping Info
						</h2>
						<div id='signup-address-container'>
							<label>
								Address
							</label>
								<input
									type="text"
									value={address}
									placeholder="Address"
									onChange={(e) => setAddress(e.target.value)}
									required
								/>
						</div>
						<div id='signup-city-container'>
							<label>
								City
							</label>
								<input
									type="text"
									value={city}
									placeholder="City"
									onChange={(e) => setCity(e.target.value)}
									required
								/>
						</div>
						<div id='signup-state-container'>
							<label>
								State
							</label>
								<input
									type="text"
									value={state}
									placeholder="State"
									onChange={(e) => setState(e.target.value)}
									required
								/>
						</div>
						<div id='signup-zipcode-container'>
							<label>
								Zipcode
							</label>
								<input
									type="number"
									value={zipcode}
									placeholder="Zipcode"
									onChange={(e) => setZipcode(e.target.value)}
									required
								/>
						</div>
						<div id='signup-admin-container'>
							<label>
								Are you an admin?
							</label>
								<input
									type="radio"
									value={true}
									name="yes-no"
									onChange={(e) => setAdmin(e.target.value)}
									required
								/> Yes
								<input
									type="radio"
									value={false}
									name="yes-no"
									onChange={(e) => setAdmin(e.target.value)}
									required
								/> No
						</div>
					</div>
					<div id='middle-border'>

					</div>
					<div id='email-password-container'>
						<h2 id='signup-subtitle'>
							Password
						</h2>
						<div id='signup-password-container'>
							<label>
								Password
							</label>
								<input
									type="password"
									value={password}
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
						</div>
						<div id='signup-confirm-password-container'>
							<label>
								Confirm Password
							</label>
								<input
									type="password"
									value={confirmPassword}
									placeholder="Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
						</div>
					</div>
				</div>
				<div id='signup-button'>
					<button type="submit">Sign Up</button>
				</div>
				<hr id='signup-hr2'/>
				<div id='login-signup-container'>
					<p>Already a member?</p>
					<OpenModalButton
					buttonText="Login"
					modalComponent={<LoginFormModal />}
					/>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
