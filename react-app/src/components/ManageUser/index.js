import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from '../../store/session'
import "./ManageUser.css"
import { updateUser } from '../../store/session'
import { NavLink } from "react-router-dom";

function ManageUser() {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        dispatch(authenticate())

        setAddress(user.address)
        setCity(user.city)
        setEmail(user.email)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setState(user.state)
        setUsername(user.username)
        setZipCode(user.zip_code)

        setPassword("")

    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userInfo = {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            address,
            city,
            state,
            zip_code: zipCode
        }

        const response = await dispatch(updateUser(userInfo))

        if (response.errors) {
            const errors = response.errors // main backend errors
            setFormErrors(errors)
        } else {
            history.push(`/`)
        }

    }


    return (
        <div id='manage-account-main-container'>

            <div id='account-nav-sidebar'>
                <button>My Info</button>
                {/* ACCOUNT SETTINGS WILL BE A NAV LINK TO DELETE USER ROUTE */}
                <button onClick={()=>history.push('/users/delete')}>Account Settings</button>
                {/* ACCOUNT SETTINGS WILL BE A NAV LINK TO DELETE USER ROUTE */}
            </div>

            <form onSubmit={handleSubmit}>
                <div id='account-basic-info-section'>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Please confirm your new username'
                        />
                        {formErrors.username && <span className='form-errors'>{formErrors.username[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id='firstName'
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Please confirm your first name'
                        />
                        {formErrors.first_name && <span className='form-errors'>{formErrors.first_name[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id='lastName'
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Please confirm your last name'
                        />
                        {formErrors.last_name && <span className='form-errors'>{formErrors.last_name[0]}</span>}
                    </div>
                </div>

                <div id='account-auth-section'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Please enter your new email'
                        />
                        {formErrors.email && <span className='form-errors'>{formErrors.email[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id='password'
                            type='text'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Please confirm your new password'
                        />
                        {formErrors.password && <span className='form-errors'>{formErrors.password[0]}</span>}
                    </div>
                </div>

                <div id='account-shipping-section'>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            id='address'
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Please confirm your new address'
                        />
                        {formErrors.address && <span className='form-errors'>{formErrors.address[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            id='city'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Please confirm your city'
                        />
                        {formErrors.city && <span className='form-errors'>{formErrors.city[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <input
                            id='state'
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder='Please confirm your state'
                        />
                        {formErrors.state && <span className='form-errors'>{formErrors.state[0]}</span>}
                    </div>
                    <div>
                        <label htmlFor="zipcode">Zip Code</label>
                        <input
                            id='zipcode'
                            type='number'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder='Please confirm your zipcode'
                        />
                        {formErrors.zip_code && <span className='form-errors'>{formErrors.zip_code[0]}</span>}
                    </div>
                </div>

                <button type='submit'>Save</button>

            </form>
        </div>
    )
}

export default ManageUser
