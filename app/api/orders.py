from flask import Blueprint, request
from ..models import Order, db
from flask_login import login_required, current_user
import uuid

orders = Blueprint("orders", __name__)

@orders.route("/")
@login_required
def allUserOrders():
    """
    Gets all user order details.
    """
    orders = Order.query.filter(Order.user_id == current_user.id)
    return [order.order_details_to_dict() for order in orders]

@orders.route("/", methods=["POST"])
@login_required
def addNewOrder():
    """
    Adds a new product order for a user.
    """
    req = request.get_json()
    batch = str(uuid.uuid4())

    existingBatchIds = Order.query.filter(Order.batch_id == batch)
    while len([order.order_details_to_dict() for order in existingBatchIds]) > 0:
        batch = str(uuid.uuid4())
        existingBatchIds = Order.query.filter(Order.batch_id == batch)

    arr = []
    for order in req['cart']:
        newOrder = Order(
            user_id = req['user'],
            product_id = order[0],
            batch_id = batch,
            quantity = order[1],
            order_date = req['date'],
            status = "pending",
            total = req['total']
        )
        db.session.add(newOrder)
        db.session.commit()
        arr.append(newOrder.order_details_to_dict())

    return arr

@orders.route("/<string:batchId>", methods=["PUT"])
@login_required
def editOrder(batchId):
    """
    Edits an order for a user.
    """
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
    """
    Deletes an order for a user.
    """
    orderToDelete = Order.query.filter(Order.batch_id == batchId)

    for order in orderToDelete:
        db.session.delete(order)

    db.session.commit()
    return {"message":"successfully deleted order"}
