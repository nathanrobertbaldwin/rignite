from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField("user_id")
    product_id = IntegerField("product_id")
    review = StringField("review", validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired()])
    photo_url = StringField("photo_url")
