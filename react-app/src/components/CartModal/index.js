import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";

export default function SeeCartModal({ addProduct }) {
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);
    let total = 0;
    const products = useSelector(state => state.products);


    let cart2 = null;
    let cartJson = localStorage.getItem(`rigCart${user.id}`);
    if (cartJson) {
        cart2 = JSON.parse(cartJson);
    }
    if (addProduct) {
        if (!cart2) cart2 = [];
        let productIndex = cart2.findIndex(ele => ele[0] === addProduct)
        if (productIndex != -1) cart2[productIndex][1]++
        else cart2.push([addProduct, 1]);
    }
    // localStorage.setItem(`rigCart${user.id}`, JSON.stringify(cart2));
    const [cart, setCart] = useState(cart2);



    const onClick = async (e) => {
        e.preventDefault();
        closeModal()
    }

    // useEffect(() => {
    // }, [cart])

    useEffect(() => {
        localStorage.setItem(`rigCart${user.id}`, JSON.stringify(cart));
    }, [cart])


    return (
        <>
            {cart && cart.map(([productId, quantity],idx) => {
                total += (products[productId].price * quantity)
                // console.log(products[productId], productId)
                return (
                    <div>
                        <h2>{products[productId].product_name}</h2>
                        <p>Price: {products[productId].price}</p>
                        <p>Quantity: <input type='number' value={quantity} onChange={(e) => {
                            let newCart = [...cart];
                            newCart[idx][1] = e.target.value;
                            if (newCart[idx][1] < 1) newCart.splice(idx,1)
                            setCart(newCart);
                        }} /></p>
                    </div>
                )
            })}
            <h2>Total: {Number.parseFloat(total).toFixed(2)}</h2>
            <button onClick={onClick}>Checkout</button>
        </>
    )
}
