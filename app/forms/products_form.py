from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ProductForm(FlaskForm):
    product_name = StringField("product_name", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    category_id = IntegerField("category_id", validators=[DataRequired()])
    brand = StringField("brand", validators=[DataRequired()])
    color = StringField("color", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    specs = StringField("specs", validators=[DataRequired()])
    submit = SubmitField("Submit")
