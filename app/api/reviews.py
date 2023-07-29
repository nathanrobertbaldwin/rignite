from flask import Blueprint, jsonify
from ..models import Review, db

reviews = Blueprint("reviews", __name__)
