import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccountModal from "./DeleteAccountModal";
import "./ManageUser.css"

function AccountSettings() {
    return (
        <div id='manage-account-main-container'>

            <div id='account-nav-sidebar'>
                <NavLink exact to="/users/manage"> <button>My Info</button> </NavLink>
                <button>Account Settings</button>
            </div>

            <div>
                <h2>Deactive Your Account</h2>
                <OpenModalButton buttonText={"Deactivate"} modalComponent={<DeleteAccountModal />} />
            </div>
        </div>
    )
}

export default AccountSettings
