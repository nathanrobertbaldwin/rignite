import { deleteUserAccount } from "../../store/session"
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";

function DeleteAccountModal() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDeleteAccount = (e) => {
        e.preventDefault()

        return dispatch(deleteUserAccount())
        .then(closeModal)
        .then(history.push("/"))
        .catch(async (res) => console.log(res));

    }

    const handleCloseModal = () => {
        closeModal()
    }


    return (
        <div id="delete-account-modal-main-container">
            <div className="">
                <h2>Confirm Deactivate</h2>
                <h4>Are you sure you want to deactive this account?</h4>
                <div className="modal-buttons-container">
                    <button onClick={handleDeleteAccount} className="">Yes (Deactivate)</button>
                    <button onClick={handleCloseModal} className="">No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal
