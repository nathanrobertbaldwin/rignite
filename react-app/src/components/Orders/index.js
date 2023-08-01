import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editOrderStatusFetch, getAllOrdersThunk } from "../../store/orders";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllReviewsThunk } from "../../store/reviews";
import { getAllPhotosThunk } from "../../store/photos";
import OpenModalButton from "../OpenModalButton";
import DeleteOrderModal from "./DeleteOrderModal";
import "./Orders.css"

// ["pending", "in transit", "delivered"]

export default function Orders() {
    let [activePage, setActivePage] = useState('pending');

    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    const orders = useSelector(state => state.orders);



    // object of orders for the user. each key is a batch id for a single user order with all info about the order
    const filteredOrders = {};
    Object.keys(orders).forEach(batch => {
        if (orders[batch][0].status === activePage) filteredOrders[batch] = orders[batch]
    });

    // console.log('User Orders', userOrders)

    useEffect(async () => {
        // MEGATHUNKADONK
        if (!Object.values(orders).length) {
            await dispatch(getAllProductCategoriesThunk());
            await dispatch(getAllProductsThunk());
            await dispatch(getAllReviewsThunk());
            await dispatch(getAllOrdersThunk());
            await dispatch(getAllPhotosThunk());
            // console.log('PINGED BACKEND')
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
                // console.log('AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',orders)
                dispatch(getAllOrdersThunk());
            }
        }
        if (Object.keys(orders).length) once()
    }, [orders])


    return (
        <>
            <h1 id="orders-title">Orders</h1>
            <div id="order-status-container">
                <h3 onClick={() => setActivePage('pending')}>Pending</h3>
                <h3 onClick={() => setActivePage('in transit')}>In-Transit</h3>
                <h3 onClick={() => setActivePage('delivered')}>Delivered</h3>
            </div>
            <div id='orders'>

                {Object.keys(filteredOrders).length ? (
                    Object.keys(filteredOrders)
                        .map(batch => {
                            const order = filteredOrders[batch][0]
                            return (
                                <div>
                                    <p>Order Date: {order.order_date}</p>
                                    <p>Order #: {batch}</p>
                                    {filteredOrders[batch].map(product => {
                                        return (
                                            <div>
                                                <p>{product.order_product.product_name}</p>
                                                <p>{product.quantity}</p>
                                            </div>
                                        )
                                    })}
                                    <OpenModalButton buttonText={"Cancel Order"} modalComponent={<DeleteOrderModal batch={batch} />} />
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
