import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editOrderStatusFetch, getAllOrdersThunk } from "../../store/orders";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import DeleteOrderModal from "./DeleteOrderModal";
import { getUserReviewsThunk } from "../../store/reviews";
import "./Orders.css";

// ["pending", "in transit", "delivered"]

export default function Orders() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    if (!user) history.push('/');
    let [activePage, setActivePage] = useState('pending');
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders);

    const filteredOrders = {};
    Object.keys(orders).forEach(batch => {
        if (orders[batch][0].status === activePage) filteredOrders[batch] = orders[batch];
    });

    useEffect(async () => {
        // MEGATHUNKADONK
        if (!Object.values(orders).length) {
            await dispatch(getAllProductCategoriesThunk());
            await dispatch(getAllProductsThunk());
            await dispatch(getAllOrdersThunk());
            await dispatch(getUserReviewsThunk());
        }
    }, [dispatch]);

    useEffect(() => {
        async function once() {
            const today = new Date();
            let update = false;
            for (let i = 0; i < Object.keys(orders).length; i++) {
                let batch = Object.keys(orders)[i];
                let order = orders[batch][0];
                let orderDate = new Date(order.order_date);
                if (today - orderDate > 604800000 && order.status != 'delivered') {
                    await dispatch(editOrderStatusFetch(batch, 'delivered'));
                    update = true;
                } else if ((today - orderDate) > 86400000 && order.status === 'pending') {
                    await dispatch(editOrderStatusFetch(batch, 'in transit'));
                    update = true;
                }
            }
            if (update) {
                dispatch(getAllOrdersThunk());
            }
        }
        if (Object.keys(orders).length) once()
    }, [])

    return (
        <>
            <h1 id="orders-title">Orders</h1>
            <div id="order-status-container">
                <h3 onClick={() => setActivePage('pending')} id={activePage==='pending'?'activePage':''}>Pending</h3>
                <h3 onClick={() => setActivePage('in transit')} id={activePage==='in transit'?'activePage':''}>In-Transit</h3>
                <h3 onClick={() => setActivePage('delivered')} id={activePage==='delivered'?'activePage':''}>Delivered</h3>
            </div>
            <div id='orders'>
                {Object.keys(filteredOrders).length ? (
                    Object.keys(filteredOrders)
                        .map(batch => {
                            const order = filteredOrders[batch][0]
                            return (
                                <div className='ordCard'>
                                    <div className='ordDets'>
                                        <p>Order Date: {order.order_date}</p>
                                        <p>Order #: {batch}</p>
                                    </div>
                                    {filteredOrders[batch].map(product => {
                                        return (
                                            <div className='prodCard' onClick={() => history.push(`/products/${product.product_id}`)}>
                                                <img src={product.order_product.product_photos[0].url} />
                                                <div className='prodDets'>
                                                    <h2>{product.order_product.product_name}</h2>
                                                    <p>Quantity:{product.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <h3>Total: ${order.total}</h3>
                                    {activePage != 'delivered' && <div className='ordCancel'>
                                        <OpenModalButton buttonText={"Cancel Order"} modalComponent={<DeleteOrderModal batch={batch} />} />
                                    </div>}
                                </div>
                            )
                        })
                ) : (
                    <div>
                        <p>We don't see any active transactions in your records.</p>
                        <p>SHOP NEW PRODUCTS TODAY!</p>
                    </div>
                )}
            </div>
        </>
    )
}
