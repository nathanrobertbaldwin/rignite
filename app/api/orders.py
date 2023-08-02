from flask import Blueprint, request
from ..models import Order, db
from flask_login import login_required, current_user
import uuid

orders = Blueprint("orders", __name__)

@orders.route("/")
@login_required
def allUserOrders():
    # ========= Get details for all orders =========
    orders = Order.query.filter(Order.user_id == current_user.id)
    return [order.order_details_to_dict() for order in orders]

@orders.route("/", methods=["POST"])
@login_required
def addNewOrder():
    req = request.get_json()
    print(req)
    batch = str(uuid.uuid4())
    arr = []
    for order in req['cart']:
        newOrder = Order(
            user_id = req['user'],
            product_id = order[0],
            batch_id = batch,
            quantity = order[1],
            order_date = req['date'],
            status = "pending"
        )
        print(newOrder)
        db.session.add(newOrder)
        db.session.commit()
        arr.append(newOrder.order_details_to_dict())

    return arr

@orders.route("/<string:batchId>", methods=["PUT"])
@login_required
def editOrder(batchId):

    status = request.json
    if status != "delivered" and status != "in transit" and status != "pending":
        return "Invalid Status"

    orderToUpdate = Order.query.filter(Order.batch_id == batchId)

    for order in orderToUpdate:
        order.status = status
        db.session.add(order)

    db.session.commit()
    return {}


@orders.route("/<string:batchId>", methods=["DELETE"])
@login_required
def deleteOrder(batchId):
    orderToDelete = Order.query.filter(Order.batch_id == batchId)

    for order in orderToDelete:
        db.session.delete(order)

    db.session.commit()
    return {"message":"successfully deleted order"}
