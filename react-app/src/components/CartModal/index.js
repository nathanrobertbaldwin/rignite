import { useModal } from "../../context/Modal";

export default function SeeCartModal() {
    const { closeModal } = useModal();
    const onClick = async (e) => {
        e.preventDefault();
        closeModal()
    }


    return (
        <>
            <h2>Click to close modal</h2>
            <button onClick={onClick}>Yes</button>
        </>
    )
}
