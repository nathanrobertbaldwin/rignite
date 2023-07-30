import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
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
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Firstname
					<input
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						required
					/>
				</label>
				<label>
					Lastname
					<input
						type="text"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						required
					/>
				</label>
				<label>
					Address
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</label>
				<label>
					City
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</label>
				<label>
					State
					<input
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
					/>
				</label>
				<label>
					Zipcode
					<input
						type="number"
						value={zipcode}
						onChange={(e) => setZipcode(e.target.value)}
						required
					/>
				</label>
				<label>
					Are you an admin?
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
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
