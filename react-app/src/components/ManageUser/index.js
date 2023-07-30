import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authenticate } from '../../store/session'
import "./ManageUser.css"
// import { updateUser } from '../../store/session'

function ManageUser() {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    console.log(user)
    // if(!user) return null

    return (
        <div id='account-nav-sidebar'>
            <div>
                <div>My Info</div>
                <div>Account Settings</div>
            </div>
            {/* <form>

            </form> */}
        </div>
    )
}

export default ManageUser
