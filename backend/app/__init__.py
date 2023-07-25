from flask import Flask, render_template, redirect
from .config import Configuration
from flask_migrate import Migrate
from .models import db

app = Flask(__name__)
app.config.from_object(Configuration)

db.init_app(app)

migrate = Migrate(app, db)

@app.route("/")
def main():
    return "Working"