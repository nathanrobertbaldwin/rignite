import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrderThunk } from "../../store/orders";

export default function SeeCartModal({ addProduct }) {
    const user = useSelector((state) => state.session.user);
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const [total, setTotal] = useState(0);
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();


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
    const [cart, setCart] = useState(cart2);



    const onClick = async (e) => {
        e.preventDefault();
        dispatch(createOrderThunk(user.id, cart, Number.parseFloat(total).toFixed(2)))
            .then(() => localStorage.removeItem(`rigCart${user.id}`))
            .then(() => history.push('/orders'))
            .then(() => closeModal())
    }

    useEffect(() => {
        let newTotal = 0;
        cart?.forEach(([prodId, quan]) => {
            newTotal += (products[prodId].price * quan)
        });
        setTotal(newTotal)
        localStorage.setItem(`rigCart${user.id}`, JSON.stringify(cart));
        if (!cart) localStorage.removeItem(`rigCart${user.id}`)
    }, [cart])


    return (
        <>
            {cart ?
                <>
                    {cart.map(([productId, quantity], idx) => {
                        return (
                            <div>
                                <h2>{products[productId].product_name}</h2>
                                <p>Price: {products[productId].price}</p>
                                <p>Quantity: <input type='number' value={quantity} onChange={(e) => {
                                    let newCart = [...cart];
                                    newCart[idx][1] = e.target.value;
                                    if (newCart[idx][1] < 1) newCart.splice(idx, 1)
                                    if (!newCart.length) newCart = null;
                                    setCart(newCart);
                                }} /></p>
                            </div>
                        )
                    })}
                    <h2>Total: {Number.parseFloat(total).toFixed(2)}</h2>
                    <button onClick={onClick}>Checkout</button>
                </>
                :
                <div id='emptyCart'>
                    <p>YOUR CART IS EMPTY!</p>
                    {Object.values(categories).map(category =>
                        <button className="emptyCartButt" onClick={() => { history.push(`/category/${category.id}`); closeModal(); }}>Shop for {category.name}</button>
                    )}
                    <button className="emptyCartButt" onClick={() => { history.push('/products/all'); closeModal(); }}>Shop for Everything</button>
                </div>
            }
        </>
    )
}
