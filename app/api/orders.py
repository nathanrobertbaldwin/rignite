from flask import Blueprint
from ..models import Order, db
from flask_login import login_required

orders = Blueprint("orders", __name__)

@orders.route("/")
@login_required
def allOrders():
    # ========= Get details for all orders =========
    orders = Order.query.all()
    return [order.order_details_to_dict() for order in orders]

# @orders.route("/new", methods=["POST"])
# @login_required
# def addNewOrder(cartInfo):
#     newOrder = Order(
#         user_id = cartInfo.user_id,
#         product_id = cartInfo.product_id,
#         batch_id = cartInfo.batch_id,
#         quantity = cartInfo.quantity,
#         order_date = cartInfo.order_date,
#         status = "pending"
#     )

#     db.session.add(newOrder)
#     db.session.commit()

@orders.route("/<string:batchId>", methods=["PUT"])
@login_required
def editOrder(batchId, status):

    if status != "delivered" and status != "in transit" and status != "pending":
        return "Invalid Status"

    orderToUpdate = Order.query.filter(Order.batch_id == batchId)

    for order in orderToUpdate:
        order.status = status
        db.session.add(order)

    db.session.commit()
    return orderToUpdate


@orders.route("/delete/<string:batchId>", methods=["DELETE"])
@login_required
def deleteOrder(batchId):
    orderToDelete = Order.query.filter(Order.batch_id == batchId)

    for order in orderToDelete:
        db.session.delete(order)

    db.session.commit()
    return "successfully deleted order"
