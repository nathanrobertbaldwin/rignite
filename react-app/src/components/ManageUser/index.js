import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from '../../store/session'
import "./ManageUser.css"
import { updateUser } from '../../store/session'

function ManageUser() {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    if (!user) history.push('/')

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

        if (!user) history.push('/')
        else {
            setAddress(user.address)
            setCity(user.city)
            setEmail(user.email)
            setFirstName(user.first_name)
            setLastName(user.last_name)
            setState(user.state)
            setUsername(user.username)
            setZipCode(user.zip_code)
        }

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
                <h2>Options</h2>
                <button className='account-nav-buttons'> My Info</button>
                <button onClick={() => history.push('/users/delete')} className='account-nav-buttons'>Account Settings</button>
                {!user?.is_admin ? <button onClick={()=>history.push('/users/reviews')} className='account-nav-buttons'>Manage Reviews</button> : <p>cannot manage reviews as an admin</p>}
            </div>

            <form onSubmit={handleSubmit} id='change-account-info-form'>
                <div id='account-basic-info-section'>
                    <h2 className="change-account-form-title">Basic</h2>
                    <div id='update-username-container'>
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
                    <div id='update-firstname-container'>
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
                    <div id='update-lastname-container'>
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
                    <h2 className="change-account-form-title">Email & Password</h2>
                    <div id='update-email-container'>
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Please enter your new email'
                        />
                        {formErrors.email && <span className='form-errors'>{formErrors.email[0]}</span>}
                    </div>
                    <div id='update-password-container'>
                        <label htmlFor="password">Password</label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Please confirm your new password'
                        />
                        {formErrors.password && <span className='form-errors'>{formErrors.password[0]}</span>}
                    </div>
                </div>

                <div id='account-shipping-section'>
                    <h2 className="change-account-form-title">Shipping Info</h2>
                    <div id='update-address-container'>
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
                    <div id='update-city-container'>
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
                    <div id='update-state-container'>
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
                    <div id='update-zipcode-container'>
                        <label htmlFor="zipcode">Zip Code</label>
                        <input
                            id='zipcode'
                            type='text'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder='Please confirm your zipcode'
                        />
                        {formErrors.zip_code && <span className='form-errors'>{formErrors.zip_code[0]}</span>}
                    </div>
                </div>

                <button type='submit' id='change-account-details-button'>Save</button>

            </form>
        </div>
    )
}

export default ManageUser
