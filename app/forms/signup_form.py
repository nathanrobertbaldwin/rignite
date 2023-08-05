from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, EmailField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_ending(form, field):
    email = field.data
    if not email.lower().endswith('.com'):
        raise ValidationError('Email must end with .com')

def zipcode_valid(form, field):
    zipcode = str(field.data)
    if len(zipcode) != 5:
        raise ValidationError("Zipcode must be a length of 5")
    for char in zipcode:
        if not char.isdigit():
            raise ValidationError("Zipcode must only contain digits no letters")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(), user_exists, email_ending])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired(), zipcode_valid])
    is_admin = BooleanField('is_admin', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
