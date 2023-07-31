import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccountModal from "./DeleteAccountModal";
import "./ManageUser.css"

function AccountSettings() {
    const history = useHistory();
    return (
        <div id='manage-account-main-container'>

            <div id='account-nav-sidebar'>
                <button onClick={()=>history.push('/users/manage')}>My Info</button>
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
