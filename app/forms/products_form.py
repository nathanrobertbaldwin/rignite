from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FloatField
from wtforms.validators import DataRequired


class ProductForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    product_name = StringField("product_name", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    category_id = IntegerField("category_id", validators=[DataRequired()])
    brand = StringField("brand", validators=[DataRequired()])
    color = StringField("color", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    specs = StringField("specs", validators=[DataRequired()])
    imageOne = StringField("imageOne", validators=[DataRequired()])
    imageTwo = StringField("imageTwo")
    imageThree = StringField("imageThree")
    imageFour = StringField("imageFour")
    submit = SubmitField("Submit")
