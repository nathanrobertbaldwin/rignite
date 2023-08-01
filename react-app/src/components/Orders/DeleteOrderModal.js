import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";

function DeleteOrderModal() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    // const handleDeleteAccount = (e) => {
    //     e.preventDefault()

    //     return dispatch(deleteUserAccount())
    //     .then(closeModal)
    //     .then(history.push("/orders"))
    //     .catch(async (res) => console.log(res));

    // }

    const handleCloseModal = () => {
        closeModal()
    }

    return (
        <div id="delete-order-modal-main-container">
            <div className="">
                <h2 className="">Confirm Delete</h2>
                <h3 className="">Are you sure you want to cancel this order?</h3>
                <div className="">
                    {/* <button onClick={handleDeleteOrder} className="">Yes (Cancel Order)</button> */}
                    <button onClick={handleCloseModal} className="">No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteOrderModal
