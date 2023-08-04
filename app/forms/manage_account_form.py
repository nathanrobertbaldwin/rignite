from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user


def user_exists(form, field):
    # Checking if email exists
    email = field.data

    all_other_users = User.query.filter(User.id != str(current_user.id)).all()

    for user in all_other_users:
        if email == user.email:
            raise ValidationError('Email is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    #aaa
    username_input = field.data

    all_other_users = User.query.filter(User.id != str(current_user.id)).all()

    for user in all_other_users:
        if username_input == user.username:
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


class ManageForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(), user_exists, email_ending])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired(), zipcode_valid])
    password = StringField('password', validators=[DataRequired()])
