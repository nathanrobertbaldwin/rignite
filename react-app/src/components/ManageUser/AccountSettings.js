import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccountModal from "./DeleteAccountModal";

function AccountSettings() {
    const history = useHistory();
    return (
        <div id='manage-account-main-container'>

            <div id='account-nav-sidebar'>
                <h2>Options</h2>
                <button onClick={()=>history.push('/users/manage')} className='account-nav-buttons'>My Info</button>
                <button className='account-nav-buttons'>Account Settings</button>
                <button onClick={()=>history.push('/users/reviews')} className='account-nav-buttons'>Manage Reviews</button>
            </div>

            <div id="deactivate-account-container">
                <h2 className="change-account-form-title">Deactive Your Account</h2>
                <p className="deativate-account-warning">Please note that deactivating your account will:</p>
                    <p className="deativate-account-warning">- Remove access to your profile and data.</p>
                    <p className="deativate-account-warning">- Disable your ability to log in to the platform.</p>
                    <p className="deativate-account-warning">- Remove your account from search results and public visibility.</p>
                    <p className="deativate-account-warning">If you are sure about deactivating your account, click the button below.</p>
                <div id="deactivate-account-modal-button">
                    <OpenModalButton buttonText={"Deactivate"} modalComponent={<DeleteAccountModal />} />
                </div>
            </div>
        </div>
    )
}

export default AccountSettings
