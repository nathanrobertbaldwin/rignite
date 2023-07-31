import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersThunk } from "../../store/orders";

// ["pending", "in transit", "delivered"]

export default function Orders() {
    let [activePage,setActivePage] = useState('pending');
    const dispatch = useDispatch();
    const orders = useSelector(state=>state.orders)
    console.log(orders)
    // let ordersFiltered;
    // useEffect(()=>{
    //     ordersFiltered = orders.filter(order=>order.status===activePage)
    // },[activePage])
    useEffect(()=>{dispatch(getAllOrdersThunk())},[])
    return (
        <>
            <h1>Orders</h1>
            <div>
                <h3 onClick={()=>setActivePage('pending')}>Pending</h3>
                <h3 onClick={()=>setActivePage('in transit')}>In-Transit</h3>
                <h3 onClick={()=>setActivePage('delivered')}>Delivered</h3>
            </div>
            <div id='orders'>

                {/* {ordersFiltered.length ? (
                    ordersFiltered.map(order=>{
                        <div>
                            <p>{order.date}</p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    })
                    ) :(
                    <div>
                        <p>We don't see any active transactions in your records.</p>
                        <p>SHOP NEW PRODUCTS TODAY!</p>
                    </div>
                    ) } */}
            </div>
        </>
    )
}
