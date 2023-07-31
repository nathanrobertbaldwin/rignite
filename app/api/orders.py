from flask import Blueprint
from ..models import Order
from flask_login import login_required

orders = Blueprint("orders", __name__)

@orders.route("/")
@login_required
def allOrders():
    # ========= Get details for all orders =========
    orders = Order.query.all()
    return [order.order_details_to_dict() for order in orders]


# @orders.route("/<string:id>")
# # @login_required
# def batchOrderDetails(id):
#     # ========= Get all orders in an order batch =========
#     orders_query = Order.query.filter(Order.batch_id == id)
#     return [order.order_by_batch_id_to_dict() for order in orders_query]
